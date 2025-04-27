import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete, Query, Inject } from '@nestjs/common';
import { IFriendService } from './interfaces/friend-service.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateFriendDto } from './dtos/create-friend.dto';
import { UpdateFriendDto } from './dtos/update-friend.dto';
import {ApiResponseHelper} from "../common/helpers/api-response.helper";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('Friends') // Swagger için kategori etiketi
@ApiBearerAuth() // Swagger'da JWT token kullanımı için
@Controller('friends')
export class FriendController {
  constructor(
      @Inject('IFriendService')
      private readonly friendService: IFriendService, // FriendService bağımlılığı enjekte ediliyor
  ) {}
  
  // Yeni arkadaş ekleme endpointi
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
      @Body() createFriendDto: CreateFriendDto,
      @CurrentUser() user: { userId: number },
  ) {
    console.log('CurrentUser:', user); // Kullanıcı bilgisi loglanıyor (isteğe bağlı kaldırılabilir)
    return ApiResponseHelper.success('Friend created successfully', await this.friendService.createFriend(user.userId, createFriendDto));

  }
  
  // Tüm arkadaşları listeleme endpointi
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@CurrentUser() user: { userId: number }) {
    return this.friendService.findAll(user.userId);
  }
  
  // Arkadaş güncelleme endpointi
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
      @Param('id') id: number,
      @Body() updateFriendDto: UpdateFriendDto,
      @CurrentUser() user: { userId: number },
  ) {
    return this.friendService.updateFriend(id, user.userId, updateFriendDto);
  }

  // Arkadaş silme endpointi
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
      @Param('id') id: number,
      @CurrentUser() user: { userId: number },
  ) {
    return this.friendService.deleteFriend(id, user.userId);
  }

  // Yaklaşan doğum günleri listeleme endpointi
  @UseGuards(JwtAuthGuard)
  @Get('upcoming')
  async findUpcoming(@CurrentUser() user: { userId: number }) {
    return this.friendService.findUpcomingBirthdays(user.userId);
  }

  // İsim veya kategoriye göre arama endpointi
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(
      @CurrentUser() user: { userId: number },
      @Query('name') name?: string,
      @Query('category') category?: string,
  ) {
    return this.friendService.searchFriends(user.userId, name, category);
  }
}
