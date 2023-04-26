import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AddPersonService } from '../../services/add-person.service';

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
}