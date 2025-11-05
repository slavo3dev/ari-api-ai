import { Controller, Get, Headers } from '@nestjs/common';
import { PorchService } from './porch.service';

@Controller('porch')
export class PorchController {
  constructor(private readonly porchService: PorchService) {}

  @Get()
  async getAllPorchData(
    @Headers('x-supabase-url') supabaseUrl: string,
    @Headers('x-supabase-key') supabaseKey: string,
  ) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    return this.porchService.getAllPorchData(supabaseUrl, supabaseKey);
  }
}
