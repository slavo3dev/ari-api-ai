import { Controller, Get, Param } from '@nestjs/common';
import { PorchService } from './porch.service';

@Controller('porch')
export class PorchController {
  constructor(private readonly porchService: PorchService) {}

  // GET /porch
  @Get()
  async getAllPorch() {
    return await this.porchService.getAllPorchData();
  }

  // GET /porch/:id
  @Get(':id')
  async getPorchById(@Param('id') id: string) {
    return await this.porchService.getPorchById(Number(id));
  }
}
