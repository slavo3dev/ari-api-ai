import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private clients: Map<string, SupabaseClient> = new Map();

  getClient(supabaseUrl: string, supabaseKey: string): SupabaseClient {
    const cacheKey = `${supabaseUrl}:${supabaseKey}`;

    if (!this.clients.has(cacheKey)) {
      const client = createClient(supabaseUrl, supabaseKey);
      this.clients.set(cacheKey, client);
    }

    return this.clients.get(cacheKey)!;
  }
}
