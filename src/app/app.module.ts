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

@NgModule({
  declarations: [
    AppComponent,
    CreaturesComponent,
    InitiativeComponent,
    IndexComponent,
    AddCreaturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
