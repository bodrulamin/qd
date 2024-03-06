import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent extends BaseComponent {
  examLevels = [];
  sessions = [];
  subjects = [];
  createQuestionForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  private required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
    subject: 'Subject',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.generateInitialValue();
    this.generateMinMaxYear();
    this.prepareCreateQuestionForm();
  }

  private generateMinMaxYear() {
    let today = new Date();
    this.minDate = today;
    this.minDate.setFullYear(today.getFullYear() - 1)
    this.maxDate = new Date();
    this.maxDate.setFullYear(today.getFullYear() + 5)
  }

  private prepareCreateQuestionForm() {
    this.createQuestionForm = this.formBuilder.group({
      examLevel: ['', Validators.required],
      session: ['', Validators.required],
      year: ['', [Validators.required]],
      subject: ['', Validators.required]
    });
  }


  searchQuestion() {
    if (this.formInvalid()) return;
    this.router.navigate(["../edit-question"], {relativeTo: this.activatedRoute})
  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.createQuestionForm)
    this.showRequiredErrorMessage(this.createQuestionForm,this.required_field)
    return this.createQuestionForm.invalid;
  }


  private generateInitialValue() {
    let today = new Date();
    let year = today.getFullYear();
    for (let i = 0; i < 5; i++) {
      let y = year + i;
      let y2 = y + 1;
      let session = y + '-' + y2;
      this.sessions.push({name: session, code:session });
    }
    this.examLevels = [
      {name: 'Cirtificate', code: 'cirtificate'}
    ];
    this.subjects = [{name: 'Bangla', code: 'bangla'}];
  }
}
