import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiResponseHelper } from '../common/helpers/api-response.helper';

@Controller('users')
export class UserController {
    
    // UserService bağımlılığını enjekte ediyoruz
    constructor(
        @Inject('IUserService') private readonly userService: IUserService,
    ) {}
    
    // Kullanıcı kaydı endpointi
    @Post('register')
    async register(@Body() body: CreateUserDto) {
        // Kullanıcı kaydını gerçekleştir ve başarılı cevabı dön
        return ApiResponseHelper.success('User registered successfully', await this.userService.register(body));

    }
    
    // Kullanıcı girişi endpointi
    @Post('login')
    async login(@Body() body: LoginDto) {
        // Kullanıcı girişi yap ve başarılı cevabı dön
        return ApiResponseHelper.success('Login successful', await this.userService.login(body));

    }
}
