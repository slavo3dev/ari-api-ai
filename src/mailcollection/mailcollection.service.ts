import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMailcollectionDto } from './dto/create-mailcollection.dto';

@Injectable()
export class MailcollectionService {
  constructor(private supabaseService: SupabaseService) {}

  async create(dto: CreateMailcollectionDto) {
    const supabase = this.supabaseService.getClient();

    // Clean inputs
    const emailClean = dto.email.trim().toLowerCase();
    const urlClean = dto.url?.trim() || null;
    const sourceUrlClean = dto.sourceURL?.trim() || null;

    const { data, error } = await supabase
      .from('mailcollection')
      .insert([
        {
          email: emailClean,
          url: urlClean,
          sourceURL: sourceUrlClean,
        },
      ])
      .select()
      .limit(1);

    if (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email is already registered.');
      }

      throw new InternalServerErrorException(error.message);
    }

    return data?.[0] ?? null;
  }
}
