import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from './components/home.component';
import {RouterModule} from "@angular/router";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        RouterModule.forChild([
            {path: '', component: HomeComponent}
        ]),
        CommonModule,
        TableModule,
        CardModule,
        NgOptimizedImage
    ]
})
export class HomeModule {
}
