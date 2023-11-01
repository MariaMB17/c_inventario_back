import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from './dto/loginUserDto.auth';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService) { }

    async signin({ username, password }: LoginUserDto) {

        const user = await this.prismaService.user.findFirst({ where: { username } })
        if (!user) {
            throw new UnauthorizedException("Invalid username");
        }

        const isMastchPwd = await bcrypt.compare(password, user.password);
        if (!isMastchPwd) {
            throw new UnauthorizedException("Invalid password");
        }

        const payload = { id: user.id, username: user.username };
        const token = await this.jwtService.signAsync(payload);

        return {
            username: user.username,
            token: token
        }
    };
}
