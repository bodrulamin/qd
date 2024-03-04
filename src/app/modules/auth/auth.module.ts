import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {RippleModule} from "primeng/ripple";

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        RippleModule
    ],
    exports: [
        LoginComponent
    ],
    declarations: [LoginComponent]
})
export class AuthModule { }
