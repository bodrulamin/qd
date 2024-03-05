import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent extends BaseComponent {
  examLevels = [];
  sessions = [];
  subjects = [];
  years = [];
  examDate: any;

  createExamForm: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.prepareCreateExamForm();

    let today = new Date()
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(today.getFullYear() - 5);
    this.maxDate.setFullYear(today.getFullYear());
  }

  private prepareCreateExamForm() {
    this.createExamForm = this.formBuilder.group({
      examLevel: ['', Validators.required],
      session: ['', Validators.required],
      year: ['', [Validators.required]],
      examName: ['', Validators.required],
      examDate: ['', Validators.required],
      examPassword: ['', Validators.required],
    });
  }

  submit() {
    this.markFormGroupAsTouched(this.createExamForm);
  }
}
