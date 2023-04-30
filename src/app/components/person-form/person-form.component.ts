import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { AddPersonService } from '../../services/add-person.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', animate(300)),
    ]),
  ],
})
export class PersonFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    poop: new FormControl(false)
  });

  constructor(private addPersonService: AddPersonService, private router: Router) { }

  handleSubmit() {
    if (this.form.valid) {
      const newPerson: Person = {
        id: Date.now(),
        name: this.form.value.name || '',
        age: Number(this.form.value.age),
        poop: this.form.value.poop ?? false,
      };

      this.addPersonService.addPerson(newPerson);
      const isConfirmed = window.confirm('Person added successfully. Do you want to go back to the list of people?');
      if (isConfirmed) {
        this.router.navigate(['/']);
      }
    }
  }
}
