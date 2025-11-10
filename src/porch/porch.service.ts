import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Porch {
  new_id: string;
  created_at?: string;
  text: string;
  email?: string;
  source?: string;
  likes?: string[];
}

@Injectable()
export class PorchService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  // ✅ CREATE
  async createPorch(porchData: Omit<Porch, 'created_at'>): Promise<Porch> {
    const { data, error } = await this.supabase
      .from('porch')
      .insert(porchData)
      .select()
      .single();

    if (error) throw error;
    return data as Porch;
  }

  // ✅ READ ALL
  async getAllPorchData(): Promise<Porch[]> {
    const { data, error } = await this.supabase
      .from('porch')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Porch[];
  }

  // ✅ READ BY ID
  async getPorchById(id: string): Promise<Porch> {
    const { data, error } = await this.supabase
      .from('porch')
      .select('*')
      .eq('new_id', id)
      .single();

    if (error || !data)
      throw new NotFoundException(`Porch with ID ${id} not found`);
    return data as Porch;
  }

  // ✅ UPDATE
  async updatePorch(id: string, updates: Partial<Porch>): Promise<Porch> {
    const { data, error } = await this.supabase
      .from('porch')
      .update(updates)
      .eq('new_id', id)
      .select()
      .single();

    if (error || !data)
      throw new NotFoundException(`Failed to update porch with ID ${id}`);
    return data as Porch;
  }

  // ✅ DELETE
  async deletePorch(id: string): Promise<{ message: string }> {
    const { error } = await this.supabase
      .from('porch')
      .delete()
      .eq('new_id', id);

    if (error)
      throw new NotFoundException(`Failed to delete porch with ID ${id}`);
    return { message: `Porch with ID ${id} deleted successfully` };
  }
}
