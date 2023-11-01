import { Injectable, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  saltRound = +process.env.BCRYPT_SALT
  constructor(private readonly prismaService: PrismaService) { }


  async create(createUserDto: CreateUserDto): Promise<User | null> {    
    const bcryptPwd = await bcrypt.hash(createUserDto.user.password, this.saltRound)
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto.user,
        password: bcryptPwd,
      }
    })
    return user
  }

  async findByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { username }
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      include: { Profile: { include: { Document: true } } }
    });
  }
  
  async findOne(id: number): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { id, },
      include: {
        Profile: true,
      }
    });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const bcryptPwd = await bcrypt.hash(updateUserDto.user.password, this.saltRound)
    return await this.prismaService.user.update({
      where: { id }, data: {
        ...updateUserDto.user,
        password: bcryptPwd,
      },
    });
  }


  async remove(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id }
    })
  }
}
