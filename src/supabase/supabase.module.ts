import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
//for test only
@Global()
@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const supabaseUrl = config.get<string>('SUPABASE_URL', '');
        const supabaseKey = config.get<string>('SUPABASE_SERVICE_ROLE_KEY', '');
        return createClient(supabaseUrl, supabaseKey);
      },
    },
    SupabaseService,
  ],
  exports: ['SUPABASE_CLIENT', SupabaseService],
})
export class SupabaseModule {}
