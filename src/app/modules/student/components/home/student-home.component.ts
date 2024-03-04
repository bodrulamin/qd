import { Component } from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent extends BaseComponent{
constructor() {
  super();
}
}
