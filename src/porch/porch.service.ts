import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface Porch {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

@Injectable()
export class PorchService {
  constructor(private readonly supabaseFactory: SupabaseService) {}

  async getAllPorchData(
    supabaseUrl: string,
    supabaseKey: string,
  ): Promise<Porch[]> {
    const supabase = this.supabaseFactory.getClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('porch')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Porch[];
  }
}
