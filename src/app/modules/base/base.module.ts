import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base-component/base.component';
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ]
})
export class BaseModule { }
