import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { User } from '../user.entity';

export interface IUserService {
    register(userData: CreateUserDto): Promise<User>;
    login(loginData: LoginDto): Promise<{ access_token: string }>;
}
