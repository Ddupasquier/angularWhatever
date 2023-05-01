import { Injectable } from '@angular/core';
import { NewPerson } from '../models/person';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AddPersonService {
  constructor(private supabaseService: SupabaseService) { }

  async addPerson(newPerson: NewPerson): Promise<void> {
    try {
      const { data, error } = await this.supabaseService.supabase
        .from('people_poop')
        .insert([{
          name: newPerson.name,
          age: newPerson.age,
          poop: newPerson.poop,
        }]);

      if (error) {
        throw new Error(`Failed to add person: ${error.message}`);
      }

      if (data) {
        console.log('Person added successfully:', data);
      }
    } catch (error) {
      console.error('Error adding person:', error);
    }
  }

  async getPeople(): Promise<NewPerson[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('people_poop')
      .select('*');

    if (error) {
      throw new Error(`Failed to fetch people: ${error.message}`);
    }

    return (data || []) as NewPerson[];
  }
}
