import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateFriendDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDateString()
    birthday: string;

    @IsOptional()
    @IsString()
    category?: string;
}
