import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { CreaturesComponent } from './creatures/creatures.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent},
  { path: 'creatures', component: CreaturesComponent},
  { path: 'initiative', component: InitiativeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
