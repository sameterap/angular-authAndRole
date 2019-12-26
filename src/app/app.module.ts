import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { FormsModule } from '@angular/forms';
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  providers: [
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
