import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      AuthModule,
  ],
  
  controllers: [UserController],
    providers: [
        {
            provide: 'IUserService',
            useClass: UserService,
        },
    ],
})
export class UserModule {}
