import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExamSchedulingService} from "../service/exam-scheduling.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {ExamModel, ScheduleModel} from "../service/domain/exam-scheduling.model";

@Component({
  selector: 'app-create-question',
  templateUrl: './exam-scheduling.component.html',
  styleUrls: ['./exam-scheduling.component.css']
})
export class ExamSchedulingComponent extends BaseComponent {
  examLevelOptions: any[] = [];
  sessionOptions = [];
  yearOptions = [];
  examSearchForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  private required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
  };
  examList: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private ExamSchedulingService: ExamSchedulingService,
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
    this.ExamSchedulingService.searchQuestion(this.examSearchForm.value).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examList = apiResponse.data
        this.examList.forEach(e => {
          e.examDate = e.examDate ? new Date(e.examDate) : e.examDate;
          e.examStartsAt = e.examStartsAt ? new Date(e.examStartsAt) : e.examStartsAt;
          e.examEndsAt = e.examEndsAt ? new Date(e.examEndsAt) : e.examEndsAt;
        })
      }

    });


  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.examSearchForm)
    this.showRequiredErrorMessage(this.examSearchForm, this.required_field)
    return this.examSearchForm.invalid;
  }

  private fetchConfiguration() {
    this.subscribers.confSubs = this.ExamSchedulingService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examLevelOptions = apiResponse.data.examLevelList;
        this.sessionOptions = apiResponse.data.examSessionList;
        this.yearOptions = apiResponse.data.examYearList;
      }
    })
  }


  clearExamList(examLevel: any) {
    this.examList = []
  }

  onExamLevelClear() {
    this.examList = []
  }

  save(e: any) {
    let schedule = this.prepareSchedule(e);

    this.ExamSchedulingService.saveSchedule([schedule]).subscribe(apiResponse => {
      if (apiResponse.result) {

      }

    });
  }

  private prepareSchedule(e: any) {
    let schedule = new ScheduleModel();
    schedule.id = e.id;
    schedule.examDate = e.examDate;
    schedule.examStartsAt = this.changeDate(e.examStartsAt, schedule.examDate);
    schedule.examEndsAt = this.changeDate(e.examEndsAt, schedule.examDate);
    schedule.quizPwd = e.quizPwd;

    return schedule;
  }

  changeDate(dateToChange: Date, newDate: Date): Date {
    return new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      dateToChange.getHours(),
      dateToChange.getMinutes(),
      dateToChange.getSeconds(),
      dateToChange.getMilliseconds()
    );
  }

}
