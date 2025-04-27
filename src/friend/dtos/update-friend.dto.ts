import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateFriendDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsDateString()
    birthday?: string;

    @IsOptional()
    @IsString()
    category?: string;
}
