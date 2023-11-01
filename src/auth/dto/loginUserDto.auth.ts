import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @MinLength(10)
    @Transform(({ value }) => value.trim())
    password: string;
}