import { Prisma } from "@prisma/client";

export class CreateInstructionDto {
    instruction: Prisma.InstructionCreateInput
    answer: Prisma.AnswerUncheckedCreateInput[]
}
