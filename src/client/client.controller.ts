import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ResponseMessage } from 'src/util/message.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ResponseMessage("Cliente registrado con exito")
  @UseGuards(AuthGuard)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ResponseMessage("Listado de Clientes")
  @UseGuards(AuthGuard)
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Cliente encontrado con exito")
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage("Cliente modificado con exito")
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ResponseMessage("Cliente elimidado con exito")
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
