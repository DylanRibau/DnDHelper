import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreaturesComponent } from './creatures/creatures.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { CombatDialogComponent } from './initiative/initiative.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCreaturesComponent } from './add-creatures/add-creatures.component';
import { MatDialogModule, MatDialogConfig } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatureInfoComponent } from './creature-info/creature-info.component';

@NgModule({
  declarations: [
    AppComponent,
    CreaturesComponent,
    InitiativeComponent,
    IndexComponent,
    AddCreaturesComponent,
    CombatDialogComponent,
    CreatureInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CombatDialogComponent]
})
export class AppModule { }
