import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewPerson } from 'src/app/models/person';
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
      const newPerson: NewPerson = {
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

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);

    if (control?.errors?.['required']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    } else if (control?.errors?.['minlength']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters long.`;
    } else if (control?.errors?.['min']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be greater than ${control.errors['min'].min - 1}.`;
    }

    return '';
  }
}
