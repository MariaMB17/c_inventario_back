import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  constructor(private readonly prismaService: PrismaService) { }
  
  async create(createClientDto: CreateClientDto): Promise<Client | null> {
    return await this.prismaService.client.create({
      data: createClientDto
    })
  }

  async findAll(): Promise<Client[]> {
    return await this.prismaService.client.findMany();
  }

  async findOne(id: number): Promise<Client | null> {
    return await this.prismaService.client.findFirst({
      where: { id, }
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client | null> {
    return await this.prismaService.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: number): Promise<Client> {
    return await this.prismaService.client.delete({
      where: { id }
    })
  }
}
