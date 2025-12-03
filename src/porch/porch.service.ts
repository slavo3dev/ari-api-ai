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
  async getAllPorchData(page = 0, limit = 100): Promise<Porch[]> {
    const pageNum = Number.isInteger(page) && page >= 0 ? page : 0;
    const limitNum = Number.isInteger(limit) && limit > 0 ? limit : 100;

    const start = pageNum * limitNum;
    const end = start + limitNum - 1;
    const { data, error } = await this.supabase
      .from('porch')
      .select('*')
      .order('created_at', { ascending: false })
      .range(start, end);

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
  // ✅ ADD LIKE
  async addLike(id: string, email: string): Promise<Porch> {
    // 1. Get existing record
    const { data: porch, error: fetchError } = await this.supabase
      .from('porch')
      .select('likes')
      .eq('new_id', id)
      .single();

    if (fetchError || !porch) throw new Error('Post not found');

    // 2. Convert likes safely
    const currentLikes: string[] = Array.isArray(porch.likes)
      ? porch.likes
      : typeof porch.likes === 'string'
        ? porch.likes.split(',').filter(Boolean)
        : [];

    // 3. Add new like (avoid duplicates)
    if (!currentLikes.includes(email)) {
      currentLikes.push(email);
    }

    // 4. Update table
    const { data: updated, error: updateError } = await this.supabase
      .from('porch')
      .update({ likes: currentLikes })
      .eq('new_id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated as Porch;
  }

  // ✅ REMOVE LIKE
  async removeLike(id: string, email: string): Promise<Porch> {
    const { data: porch, error: fetchError } = await this.supabase
      .from('porch')
      .select('likes')
      .eq('new_id', id)
      .single();

    if (fetchError || !porch) throw new Error('Post not found');

    const currentLikes: string[] = Array.isArray(porch.likes)
      ? porch.likes
      : typeof porch.likes === 'string'
        ? porch.likes.split(',').filter(Boolean)
        : [];

    const updatedLikes = currentLikes.filter((user) => user !== email);

    const { data: updated, error: updateError } = await this.supabase
      .from('porch')
      .update({ likes: updatedLikes })
      .eq('new_id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated as Porch;
  }
}
