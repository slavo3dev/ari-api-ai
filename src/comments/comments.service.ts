import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Comment {
  id?: string;
  porch_id: string;
  email: string;
  text: string;
  created_at?: string;
}

@Injectable()
export class CommentsService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async addComment(comment: Comment): Promise<Comment> {
    const { data, error } = await this.supabase
      .from('comments')
      .insert([comment])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCommentsByPorchId(porchId: string): Promise<Comment[]> {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .eq('porch_id', porchId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  async deleteComment(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
