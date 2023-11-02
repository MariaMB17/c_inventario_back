import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma.service';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {

  constructor(private readonly prismaService: PrismaService) { }
  
  async create(createAnswerDto: CreateAnswerDto): Promise<Answer | null> { 
    return await this.prismaService.answer.create({
      data: createAnswerDto.answer
    })
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
