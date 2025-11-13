import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Source {
  id?: number;
  created_at?: string;
  text: string;
  source?: string;
  category?: string;
  email?: string;
  likes?: string[];
}

@Injectable()
export class SourcesService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  // ✅ CREATE
  async createSource(
    sourceData: Omit<Source, 'created_at' | 'id'>,
  ): Promise<Source> {
    const { data, error } = await this.supabase
      .from('sources')
      .insert(sourceData)
      .select()
      .single();

    if (error) throw error;
    return data as Source;
  }

  // ✅ READ ALL
  async getAllSources(): Promise<Source[]> {
    const { data, error } = await this.supabase
      .from('sources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Source[];
  }

  // ✅ READ BY ID
  async getSourceById(id: number): Promise<Source> {
    const { data, error } = await this.supabase
      .from('sources')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data)
      throw new NotFoundException(`Source with ID ${id} not found`);
    return data as Source;
  }

  // ✅ UPDATE
  async updateSource(id: number, updates: Partial<Source>): Promise<Source> {
    const { data, error } = await this.supabase
      .from('sources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data)
      throw new NotFoundException(`Failed to update source with ID ${id}`);
    return data as Source;
  }

  // ✅ DELETE
  async deleteSource(id: number): Promise<{ message: string }> {
    const { error } = await this.supabase.from('sources').delete().eq('id', id);

    if (error)
      throw new NotFoundException(`Failed to delete source with ID ${id}`);
    return { message: `Source with ID ${id} deleted successfully` };
  }

  // ✅ ADD LIKE (prevents duplicate likes)
  async addLike(id: number, email: string): Promise<Source> {
    // 1. Fetch current likes
    const { data: source, error: fetchError } = await this.supabase
      .from('sources')
      .select('likes')
      .eq('id', id)
      .single();

    if (fetchError || !source) throw new NotFoundException('Source not found');

    // 2. Normalize current likes
    const currentLikes: string[] = Array.isArray(source.likes)
      ? source.likes
      : typeof source.likes === 'string'
        ? source.likes.split(',').filter(Boolean)
        : [];

    // 3. Prevent duplicate likes
    if (!currentLikes.includes(email)) {
      currentLikes.push(email);
    }

    // 4. Update likes
    const { data: updated, error: updateError } = await this.supabase
      .from('sources')
      .update({ likes: currentLikes })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated as Source;
  }

  // ✅ REMOVE LIKE
  async removeLike(id: number, email: string): Promise<Source> {
    const { data: source, error: fetchError } = await this.supabase
      .from('sources')
      .select('likes')
      .eq('id', id)
      .single();

    if (fetchError || !source) throw new NotFoundException('Source not found');

    const currentLikes: string[] = Array.isArray(source.likes)
      ? source.likes
      : typeof source.likes === 'string'
        ? source.likes.split(',').filter(Boolean)
        : [];

    const updatedLikes = currentLikes.filter((user) => user !== email);

    const { data: updated, error: updateError } = await this.supabase
      .from('sources')
      .update({ likes: updatedLikes })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated as Source;
  }
}
