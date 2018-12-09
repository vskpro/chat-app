import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BeforeLoginGuard } from 'src/app/guards/before-login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [BeforeLoginGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
