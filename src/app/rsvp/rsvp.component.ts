import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RsvpService } from '../core/services/rsvp.service';
import { RsvpStatus } from '../core/models/rsvp.types';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {
  rsvpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rsvpService: RsvpService,
    private router: Router
  ) {
    this.rsvpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator()]],
      status: ['Yes']
    });
  }

  private emailValidator() {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(control.value) ? null : { invalidEmail: true };
    };
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.rsvpForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getEmailErrorMessage(): string {
    const email = this.rsvpForm.get('email');
    if (email?.errors?.['required']) return 'Email is required';
    if (email?.errors?.['invalidEmail']) return 'Please enter a valid email address (e.g., user@example.com)';
    return '';
  }

  addRsvp(): void {
    if (this.rsvpForm.invalid) return;

    const { name, email, status } = this.rsvpForm.value;
    this.rsvpService.addOrUpdateRsvp(
      { name, email },
      status as RsvpStatus
    );
    this.router.navigate(['/']);
  }
}
