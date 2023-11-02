import { Injectable } from '@nestjs/common';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { PrismaService } from 'src/prisma.service';
import { Instruction } from './entities/instruction.entity';
import { AnswerService } from 'src/answer/answer.service';

@Injectable()
export class InstructionService {

  constructor(private readonly prismaService: PrismaService, public answerService: AnswerService) { }
  
  async create(createInstructionDto: CreateInstructionDto): Promise<Instruction | null> { 
    const instruction = await this.prismaService.instruction.create({
      data: createInstructionDto.instruction
    })
    if(instruction?.id) {
      const { id } = instruction
      let answerData = createInstructionDto.answer
      const dataAns = answerData.map((item) => {
        item.instructionId = id
        return item
      })      
      const result = await Promise.all(dataAns.map((an) => this.answerService.create({"answer":{...an}})))
    }    
    return instruction;
  }

  async findAll(): Promise<Instruction[]> {
    return await this.prismaService.instruction.findMany({
      include: { answers: true } 
    });
  }

  async findOne(id: number): Promise<Instruction> {
    return await this.prismaService.instruction.findFirst({
      where: { id, },
      include: {
        answers: true
      }
    });
  }

  async update(id: number, updateInstructionDto: UpdateInstructionDto): Promise<Instruction> {
    return await this.prismaService.instruction.update({
      where: { id }, data: updateInstructionDto,
    });
  }

  async remove(id: number): Promise<Instruction> {
    return await this.prismaService.instruction.delete({
      where: { id }
    })
  }
}
