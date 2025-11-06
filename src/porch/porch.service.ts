import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Porch {
  created_at?: string;
  text?: string;
  email?: string;
  source?: string;
  new_id?: string;
  likes?: string[];
}

@Injectable()
export class PorchService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async getAllPorchData(): Promise<Porch[]> {
    const { data, error } = await this.supabase
      .from('porch')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Porch[]; // 👈 cast it safely
  }

  async getPorchById(id: number): Promise<Porch> {
    const { data, error }: { data: Porch | null; error: Error | null } =
      await this.supabase.from('porch').select('*').eq('new_id', id).single();

    if (error) throw error;
    return data as Porch; // 👈 cast single record
  }
}
