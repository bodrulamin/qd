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
  required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
    examName: 'Exam Name',
    examDate: 'Date of Exam',
    examPassword: 'Exam Password'
  };

  constructor(private formBuilder: FormBuilder) {
    super();
    this.prepareCreateExamForm();
    this.generateInitialValue();

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
    if (this.formInvalid()) return;
  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.createExamForm);
    this.showRequiredErrorMessage(this.createExamForm, this.required_field)
    return this.createExamForm.invalid;
  }

  private generateInitialValue() {
    let today = new Date()
    const firstDayOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
    const lastDayOfYear = new Date(firstDayOfNextYear.getTime() - 1);
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(today.getFullYear() - 5);
    this.maxDate = lastDayOfYear;

    let year = today.getFullYear();
    for (let i = 0; i < 5; i++) {
      let y = year + i;
      let y2 = y + 1;
      let session = y + '-' + y2;
      this.sessions.push({name: session, code: session});
    }
    this.examLevels = [
      {name: 'Cirtificate', code: 'cirtificate'}
    ];
    this.subjects = [{name: 'Bangla', code: 'bangla'}];
  }
}
