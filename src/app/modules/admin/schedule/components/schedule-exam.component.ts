import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScheduleexamService} from "../service/scheduleexam.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-create-question',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent extends BaseComponent {
  examLevelOptions: any[] = [];
  sessionOptions = [];
  subjectOptions = [];
  yearOptions = [];
  examSearchForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  private required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private createQuestionService: ScheduleexamService,
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
    this.examSearchForm = this.formBuilder.group({
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
    });
  }


  searchExams() {
    if (this.formInvalid()) return;
    this.createQuestionService.searchQuestion(this.examSearchForm.value).subscribe(apiResponse => {
      if (apiResponse.result) {
        if (apiResponse.data.isNew) {
          this.messageService.add({summary: 'Creating new question', detail: '', severity: 'success'})
          this.router.navigate(["../edit-question"], {
            state: {data: this.examSearchForm.value},
            relativeTo: this.activatedRoute
          })
        } else {
          this.messageService.add({summary: 'Editing existing question', detail: '', severity: 'success'})
          this.router.navigate(["../edit-question"], {
            queryParams: {id: apiResponse.data.existingQues.id},
            relativeTo: this.activatedRoute
          })
        }


      }
    });


  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.examSearchForm)
    this.showRequiredErrorMessage(this.examSearchForm, this.required_field)
    return this.examSearchForm.invalid;
  }

  private fetchConfiguration() {
    this.subscribers.confSubs = this.createQuestionService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examLevelOptions = apiResponse.data.examLevelList;
        this.sessionOptions = apiResponse.data.examSessionList;
        this.yearOptions = apiResponse.data.examYearList;
      }
    })
  }


  onExamLevelChange(examLevel: any) {
    this.examSearchForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = examLevel ? this.examLevelOptions.find(l => l.code === examLevel).subList : [];
  }

  onExamLevelClear() {
    this.examSearchForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = []
  }
}
