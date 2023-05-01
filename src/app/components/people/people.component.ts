import { Component, OnInit } from '@angular/core';
import { Person, NewPerson } from 'src/app/models/person';
import { AddPersonService } from '../../services/add-person.service';
import { SortEvent } from '../../directives/sort.directive';

function isPersonKey(key: string): key is keyof Person {
  return key === 'name' || key === 'age' || key === 'poop';
}

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];

  constructor(private addPersonService: AddPersonService) { }

  async ngOnInit(): Promise<void> {
    try {
      const newPeople: NewPerson[] = await this.addPersonService.getPeople();
      this.people = newPeople.map((newPerson, index) => ({
        ...newPerson,
        id: index,
        created_at: Date.now(),
      }));
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  }

  helloWorld() {
    alert('splat!');
  }

  onSort(event: SortEvent) {
    const { column, direction } = event;

    if (!column || !direction || !isPersonKey(column)) {
      this.people = this.people.slice(); // Create a new array with the same elements
      return;
    }

    this.people.sort((a, b) => {
      const res = a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0;
      return direction === 'asc' ? res : -res;
    });
  }
}
