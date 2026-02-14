import { Module } from '@nestjs/common';
import { MailcollectionController } from './mailcollection.controller';
import { MailcollectionService } from './mailcollection.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [MailcollectionController],
  providers: [MailcollectionService, SupabaseService],
})
export class MailcollectionModule {}
