import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AddPersonService } from '../../services/add-person.service';
import { SortEvent, SortDirection } from '../../directives/sort.directive';

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

  ngOnInit(): void {
    this.addPersonService.people$.subscribe((data) => {
      this.people = data;
    });
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