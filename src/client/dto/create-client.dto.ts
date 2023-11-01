import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    rif: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
