import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class AddPersonService {
  private _people = new BehaviorSubject<Person[]>([]);

  people$ = this._people.asObservable();

  constructor(private http: HttpClient) {
    this.fetchPeople();
  }

  fetchPeople() {
    this.http.get<Person[]>('assets/api.json').subscribe((data) => {
      this._people.next(data);
    });
  }

  addPerson(person: Person) {
    const currentPeople = this._people.getValue();
    this._people.next([...currentPeople, person]);
  }
}
