import { Prisma } from "@prisma/client";

export class CreateAnswerDto {
    answer: Prisma.AnswerUncheckedCreateInput
}
