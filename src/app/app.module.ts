import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularSplitModule } from 'angular-split';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { QuestionComponent } from './views/question/question.component';
import { QthumbnailComponent } from './views/qthumbnail/qthumbnail.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestionComponent,
    QthumbnailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSplitModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
