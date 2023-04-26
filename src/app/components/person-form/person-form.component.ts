import { Component } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AddPersonService } from '../../services/add-person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {
  name: string = '';
  age: number = 0;
  poop: boolean = false;

  constructor(private addPersonService: AddPersonService) { }

  handleSubmit() {
    const newPerson: Person = {
      id: Date.now(), // Or another logic for generating unique IDs
      name: this.name,
      age: this.age,
      poop: this.poop,
    };
    this.addPersonService.addPerson(newPerson);
  }
}
