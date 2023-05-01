import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    const { supabaseUrl, supabaseKey } = environment;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Add your Supabase methods here
}
