import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma.service';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {

  constructor(private readonly prismaService: PrismaService) { }
  
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier | null> {
    return await this.prismaService.supplier.create({
      data: createSupplierDto
    })
  }

  async findAll(): Promise<Supplier[]> {
    return await this.prismaService.supplier.findMany();
  }

  async findOne(id: number): Promise<Supplier | null> {
    return await this.prismaService.supplier.findFirst({
      where: { id, }
    });
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier | null> {
    return await this.prismaService.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

 async remove(id: number): Promise<Supplier> {
    return await this.prismaService.supplier.delete({
      where: { id }
    })
  }
}
