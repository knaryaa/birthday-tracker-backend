import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './friend.entity';
import { User } from '../user/user.entity';
import { CreateFriendDto } from './dtos/create-friend.dto';
import { UpdateFriendDto } from './dtos/update-friend.dto';
import { IFriendService } from './interfaces/friend-service.interface';

@Injectable()
export class FriendService implements IFriendService {
  constructor(
      @InjectRepository(Friend)
      private readonly friendRepository: Repository<Friend>, // Friend repository'sini enjekte ediyoruz
  ) {}

  // Yeni arkadaş oluşturur
  async createFriend(userId: number, createFriendDto: CreateFriendDto): Promise<Friend> {
    const friend = this.friendRepository.create({
      ...createFriendDto,
      user: { id: userId } as User, // Kullanıcı ilişkilendiriliyor
    });

    return this.friendRepository.save(friend);
  }

  // Doğum günü yaklaşan arkadaşları yakından uzağa göre sıralar
  private sortFriendsByUpcomingBirthday(friends: Friend[]): Friend[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return friends.sort((a, b) => {
      const aBirthday = new Date(today.getFullYear(), new Date(a.birthday).getMonth(), new Date(a.birthday).getDate());
      const bBirthday = new Date(today.getFullYear(), new Date(b.birthday).getMonth(), new Date(b.birthday).getDate());

      let aDiff = (aBirthday.getTime() - today.getTime()) / (1000 * 3600 * 24);
      let bDiff = (bBirthday.getTime() - today.getTime()) / (1000 * 3600 * 24);

      if (aDiff < 0) aDiff += 365;
      if (bDiff < 0) bDiff += 365;

      return aDiff - bDiff;
    });
  }

  
  // Tüm arkadaşları listeler ve doğum gününe göre sıralar
  async findAll(userId: number): Promise<Friend[]> {
    const friends = await this.friendRepository.find({
      where: { user: { id: userId } },
    });

    return this.sortFriendsByUpcomingBirthday(friends);
  }

  // Belirli bir arkadaşı günceller
  async updateFriend(id: number, userId: number, updateFriendDto: UpdateFriendDto): Promise<Friend> {
    const friend = await this.friendRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!friend) {
      throw new NotFoundException('Friend not found or unauthorized');
    }

    Object.assign(friend, updateFriendDto);

    return this.friendRepository.save(friend);
  }

  // Belirli bir arkadaşı siler
  async deleteFriend(id: number, userId: number): Promise<void> {
    const friend = await this.friendRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!friend) {
      throw new NotFoundException('Friend not found or unauthorized');
    }

    await this.friendRepository.remove(friend);
  }

  // Yaklaşan 7 gün içinde doğum günü olan arkadaşları listeler
  async findUpcomingBirthdays(userId: number): Promise<Friend[]> {
    const friends = await this.friendRepository.find({
      where: { user: { id: userId } },
      order: { birthday: 'ASC' },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Saat bilgisini sıfırla

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return friends.filter((friend) => {
      const birthday = new Date(friend.birthday);
      const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
      thisYearBirthday.setHours(0, 0, 0, 0); // Saat bilgisini sıfırla

      return thisYearBirthday >= today && thisYearBirthday <= nextWeek;
    });
  }

  // İsim veya kategoriye göre arkadaş arama
  async searchFriends(userId: number, name?: string, category?: string): Promise<Friend[]> {
    const query = this.friendRepository.createQueryBuilder('friend')
        .leftJoin('friend.user', 'user')
        .where('user.id = :userId', { userId });

    if (name) {
      query.andWhere('LOWER(friend.name) LIKE LOWER(:name)', { name: `%${name}%` });
    }

    if (category) {
      query.andWhere('LOWER(friend.category) = LOWER(:category)', { category });
    }

    const friends = await query.getMany();
    return this.sortFriendsByUpcomingBirthday(friends);
  }
}
