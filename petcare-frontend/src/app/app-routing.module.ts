import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { ShelterDetailComponent } from './pages/shelter-detail/shelter-detail';
import { PetsComponent } from './pages/pets/pets';
import { SheltersComponent } from './pages/shelters/shelters';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shelters', component: SheltersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shelter/:id', component: ShelterDetailComponent },
  { path: 'pets', component: PetsComponent },
  { path: '**', redirectTo: '' }
];
