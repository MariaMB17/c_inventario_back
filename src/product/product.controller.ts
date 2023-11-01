import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseMessage } from 'src/util/message.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ResponseMessage("Producto registrado con exito")
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ResponseMessage("Listado de productos")
  @UseGuards(AuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Producto encontrado con exito")
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage("Producto modificado con exito")
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ResponseMessage("Producto eliminado con exito")
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
