import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreaturesComponent } from './creatures/creatures.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCreaturesComponent } from './add-creatures/add-creatures.component';
import { MatDialogModule, MatDialogConfig } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatureInfoComponent } from './creature-info/creature-info.component';
import { CombatComponent } from './combat/combat.component';
import { CreaturesDialogComponent } from './creatures-dialog/creatures-dialog.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthUtil } from './util/auth.util';
import { TokenInterceptor } from './util/token.interceptor';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CreaturesComponent,
    InitiativeComponent,
    IndexComponent,
    AddCreaturesComponent,
    CreatureInfoComponent,
    CombatComponent,
    CreaturesDialogComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AuthUtil,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreaturesDialogComponent]
})
export class AppModule { }
