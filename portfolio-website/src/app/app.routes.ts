import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'menu', component: AppComponent },
  { path: 'about', component: AppComponent },
  { path: 'formation', component: AppComponent },
  { path: 'competences', component: AppComponent },
  { path: 'projects', component: AppComponent },
];
