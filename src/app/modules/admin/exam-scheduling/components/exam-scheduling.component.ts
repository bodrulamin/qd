import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExamSchedulingService} from "../service/exam-scheduling.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {ScheduleModel} from "../service/domain/exam-scheduling.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-exam-scheduling',
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
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
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
        this.messageService.add({summary: 'Saved', detail: "Exam Schedule Updated", severity: 'success'});
      }

    });
  }

  private prepareSchedule(e: any) {
    let schedule = new ScheduleModel();
    schedule.id = e.id;
    schedule.examDate = e.examDate;
    schedule.examStartsAt = e.examStartsAt ?  this.changeDate(e.examStartsAt, schedule.examDate) : null;
    schedule.examEndsAt = e.examEndsAt ?  this.changeDate(e.examEndsAt, schedule.examDate):null;
    schedule.quizPwd = e.quizPwd;

    schedule.examDate = this.datePipe.transform(schedule.examDate,'yyyy-MM-dd')

    return schedule;
  }

  changeDate(dateToChange: Date, newDate: Date | string): Date {
    newDate = new Date(newDate);
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
