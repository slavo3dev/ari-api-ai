import { Module } from '@nestjs/common';
import { PorchService } from './porch.service';
import { PorchController } from './porch.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [PorchController],
  providers: [PorchService],
})
export class PorchModule {}
