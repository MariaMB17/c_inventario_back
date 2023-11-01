import { Prisma } from "@prisma/client";

export class CreateProductDto {
    producto: Prisma.ProductCreateInput
}
