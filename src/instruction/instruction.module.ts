import { Module } from '@nestjs/common';
import { InstructionService } from './instruction.service';
import { InstructionController } from './instruction.controller';
import { PrismaService } from 'src/prisma.service';
import { AnswerService } from 'src/answer/answer.service';

@Module({
  controllers: [InstructionController],
  providers: [InstructionService, PrismaService, AnswerService],
})
export class InstructionModule {}
