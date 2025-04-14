import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { RsvpListComponent } from './rsvp-list/rsvp-list.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'rsvp', component: RsvpComponent },
  { path: 'rsvp-list', component: RsvpListComponent },
  { path: '**', redirectTo: '' }
]; 