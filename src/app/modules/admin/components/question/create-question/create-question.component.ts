import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../service/admin.service";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent extends BaseComponent {
  examLevelOptions:any[] = [];
  sessionOptions = [];
  subjectOptions = [];
  yearOptions = [];
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
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.generateMinMaxYear();
    this.prepareCreateQuestionForm();
    this.fetchConfiguration();
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
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
      subject: [null, Validators.required]
    });
  }


  searchQuestion() {
    if (this.formInvalid()) return;
    this.router.navigate(["../edit-question"], {relativeTo: this.activatedRoute})
  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.createQuestionForm)
    this.showRequiredErrorMessage(this.createQuestionForm, this.required_field)
    return this.createQuestionForm.invalid;
  }

  private fetchConfiguration() {
    this.subscribers.confSubs = this.adminService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examLevelOptions = apiResponse.data.examLevelList;
        this.sessionOptions = apiResponse.data.examSessionList;
        this.yearOptions = apiResponse.data.examYearList;
      }
    })
  }


  onExamLevelChange(examLevel: any) {
    this.createQuestionForm.controls['subject'].setValue(null)
    this.subjectOptions = examLevel ? this.examLevelOptions.find(l=> l.code === examLevel).subList : [];
  }

  onExamLevelClear() {
    this.createQuestionForm.controls['subject'].setValue(null)
    this.subjectOptions = []
  }
}
