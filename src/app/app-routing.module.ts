import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { CreaturesComponent } from './creatures/creatures.component';
import { IndexComponent } from './index/index.component';
import { AddCreaturesComponent } from './add-creatures/add-creatures.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'index', component: IndexComponent},
  { path: 'creatures', component: CreaturesComponent},
  { path: 'initiative', component: InitiativeComponent},
  { path: 'add-creature', component: AddCreaturesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
