import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LockQuestionService} from "../lock-question/service/lock-question.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../base/components/base-component/base.component";
import {LockModel} from "../lock-question/service/domain/lock.model";
import {Component, Input, OnInit} from "@angular/core";
import {AdminService} from "../service/admin.service";

@Component({
  selector: 'app-lock-unlock',
  templateUrl: './lock-unlock.component.html',
  styleUrls: ['./lock-unlock.component.css']
})
export class LockUnlockComponent extends BaseComponent implements OnInit {
  @Input() header: string;
  @Input() actionCode: string;

  examLevelOptions: any[] = [];
  sessionOptions = [];
  yearOptions = [];
  examSearchForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
  };
  examList: any[] = [];
  lockPassword: string;
  inputPasswordDialogVisible: boolean = false;
  isLock: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private lockQuestionService: LockQuestionService,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.prepareCreateQuestionForm();
    this.fetchConfiguration();
  }

  ngOnInit() {

  }

  private prepareCreateQuestionForm() {
    this.examSearchForm = this.formBuilder.group({
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
    });
  }


  searchExams() {
    let searchModel = this.examSearchForm.value;
    searchModel.actionCode = this.actionCode;
    if (this.formInvalid()) return;
    this.lockQuestionService.searchQuestionToLockUnlock(this.examSearchForm.value).subscribe(apiResponse => {
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
    this.subscribers.confSubs = this.adminService.fetchConfiguration().subscribe(apiResponse => {
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


  batchLockUnlock() {
    let lockModels = this.examList.map(e => {
      let lockModel = new LockModel();
      lockModel.quesId = e.id;
      lockModel.isLock = this.isLock;
      lockModel.password = this.lockPassword;
      return lockModel;
    });

    this.lockQuestionService.lockUnlockQuestion(lockModels).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examList = [];
        if (this.isLock) {
          this.messageService.add({summary: 'Locked', detail: 'Exam Questions are locked!', severity: 'success'});
        } else {
          this.messageService.add({summary: 'Uhocked', detail: 'Exam Questions are unlocked!', severity: 'success'});

        }
        this.searchExams();
      }
    });
    this.inputPasswordDialogVisible = false;
  }


  lockUnlock(e: any) {
    let lockModel = new LockModel();
    lockModel.quesId = e.id;
    lockModel.isLock = !e.isLock;
    lockModel.password = e.lockPassword;

    this.lockQuestionService.lockUnlockQuestion([lockModel]).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examList = [];
        if (lockModel.isLock) {
          this.messageService.add({summary: 'Locked', detail: 'Exam Question is locked!', severity: 'success'});
        } else {
          this.messageService.add({summary: 'Uhocked', detail: 'Exam Question is unlocked!', severity: 'success'});
        }
        this.searchExams();

      }
    });
  }
}
