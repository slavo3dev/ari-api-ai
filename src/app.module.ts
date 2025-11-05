import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { PorchModule } from './porch/porch.module';

@Module({
  imports: [SupabaseModule, PorchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
