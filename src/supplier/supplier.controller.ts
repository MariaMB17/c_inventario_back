import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ResponseMessage } from 'src/util/message.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ResponseMessage("Proveedor registrado con exito")
  @UseGuards(AuthGuard)
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ResponseMessage("Listado de Proveedores")
  @UseGuards(AuthGuard)
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Proveedor enconntrado con exito")
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage("Proveedor modificado con exito")
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @ResponseMessage("Proveedor eliminado con exito")
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
