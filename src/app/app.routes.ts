import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPage },
];
