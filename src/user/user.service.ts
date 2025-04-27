import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, // User repository'sini enjekte ediyoruz
        private jwtService: JwtService, // JWT token üretimi için servis
    ) {}
    
    // Kullanıcı kaydı
    async register(userData: CreateUserDto): Promise<User> {
        // Aynı email ile kaydolmuş bir kullanıcı var mı kontrol et
        const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new ConflictException('Email already exists'); // Email zaten varsa hata fırlat
        }
        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        // Yeni kullanıcı nesnesi oluştur
        const newUser = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        // Veritabanına kaydet
        return this.userRepository.save(newUser);
    }
    
    // Kullanıcı girişi
    async login(loginData: LoginDto): Promise<{ access_token: string }> {
        // Email ile kullanıcıyı bul
        const user = await this.userRepository.findOne({ where: { email: loginData.email } });
        if (!user) {
            throw new UnauthorizedException('Geçersiz email ya da şifre'); // Kullanıcı bulunamazsa hata
        }
        // Şifre doğrulaması yap
        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Geçersiz email ya da şifre'); // Şifre yanlışsa hata
        }
        // JWT token payload'ı oluştur
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload); // Token üret

        return { access_token: token }; // Token'ı döndür
    }
}
