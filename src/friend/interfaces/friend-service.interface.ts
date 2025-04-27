import { CreateFriendDto } from '../dtos/create-friend.dto';
import { UpdateFriendDto } from '../dtos/update-friend.dto';
import { Friend } from '../friend.entity';

export interface IFriendService {
    createFriend(userId: number, createFriendDto: CreateFriendDto): Promise<Friend>;
    findAll(userId: number): Promise<Friend[]>;
    updateFriend(id: number, userId: number, updateFriendDto: UpdateFriendDto): Promise<Friend>;
    deleteFriend(id: number, userId: number): Promise<void>;
    findUpcomingBirthdays(userId: number): Promise<Friend[]>;
    searchFriends(userId: number, name?: string, category?: string): Promise<Friend[]>;
}
