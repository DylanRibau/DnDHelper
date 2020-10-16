import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreaturesComponent } from './creatures/creatures.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCreaturesComponent } from './add-creatures/add-creatures.component';
import { MatDialogModule, MatDialogConfig } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatureInfoComponent } from './creature-info/creature-info.component';
import { CombatComponent } from './combat/combat.component';
import { CreaturesDialogComponent } from './creatures-dialog/creatures-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CreaturesComponent,
    InitiativeComponent,
    IndexComponent,
    AddCreaturesComponent,
    CreatureInfoComponent,
    CombatComponent,
    CreaturesDialogComponent
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
  entryComponents: [CreaturesDialogComponent]
})
export class AppModule { }
