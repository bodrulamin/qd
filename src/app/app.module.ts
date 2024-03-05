import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        ToastModule,
        ConfirmDialogModule
    ],
  providers: [
    MessageService,ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
