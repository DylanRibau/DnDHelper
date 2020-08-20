import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { CreaturesComponent } from './creatures/creatures.component';
import { IndexComponent } from './index/index.component';
import { AddCreaturesComponent } from './add-creatures/add-creatures.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent},
  { path: 'creatures', component: CreaturesComponent},
  { path: 'initiative', component: InitiativeComponent},
  { path: 'addCreatures', component: AddCreaturesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
