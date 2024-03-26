import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {TableLazyLoadEvent} from "primeng/table";
import {ExamModel, ExamSearchModel} from "../service/domain/exam.model";
import {ExamConfgurationService} from "../service/exam-confguration.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {AdminService} from "../../service/admin.service";

@Component({
  selector: 'app-create-exam',
  templateUrl: './exam-configuration.component.html',
  styleUrls: ['./exam-configuration.component.css']
})
export class ExamConfigurationComponent extends BaseComponent {
  examLevelOptions = [];
  sessionOptions = [];
  subjectOptions = [];
  yearOptions = [];
  examDate: any;

  urlSearchParam = new Map();
  createExamForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
    examName: 'Exam Name',
    examDate: 'Date of Exam',
    password: 'Student Login Password'
  };
  editMode = false;
  examList = [];
  passwordDialogVisible = false;
  actionMenu = [];
  selectedPassword = '';
  activeRowIndex: any;
  examLevelMap: Map<any,any> = new Map<any, any>();

  constructor(
    private formBuilder: FormBuilder,
    private examConfgurationService: ExamConfgurationService,
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe:DatePipe
  ) {
    super();
    this.setupActionMenu();
    this.prepareCreateExamForm();
    this.generateInitialValue();
    this.fetchConfiguration();
  }

  private prepareCreateExamForm() {
    this.createExamForm = this.formBuilder.group({
      id: [0, Validators.required],
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
      examName: [null, Validators.required],
      examDate: [new Date(), Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.formInvalid()) return;
    let exam:ExamModel = this.createExamForm.value;
    exam.examDate = this.datePipe.transform(exam.examDate,'yyyy-MM-dd')
    if (this.editMode) {
      this.subscribers.addExamSubs = this.examConfgurationService.addExam(exam).subscribe(apiResponse => {
        if (apiResponse.result) {
          this.messageService.add({summary:'Successful !',detail:'Exam Edited Successfully',severity:'success'})
          this.fetchExamList(this.urlSearchParam);
        }
      })
    } else {
      delete exam['id'];
      this.subscribers.addExamsubs2 = this.examConfgurationService.addExam(exam).subscribe(apiResponse => {
        if (apiResponse.result) {
          this.messageService.add({summary:'Successful !',detail:'Exam Created Successfully',severity:'success'})
          this.fetchExamList(this.urlSearchParam);

        }
      })
    }
    this.editMode = false;
    this.clearInput();
    this.markFormGroupAsUnTouched(this.createExamForm);

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
    this.maxDate = lastDayOfYear;

  }

  private fetchConfiguration() {
    this.subscribers.confSubs = this.adminService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examLevelOptions = apiResponse.data.examLevelList;
        this.sessionOptions = apiResponse.data.examSessionList;
        this.yearOptions = apiResponse.data.examYearList;

        apiResponse.data.examLevelList.forEach(e => {
          this.examLevelMap.set(e.code,e.name);
        });

      }
    })
  }

  showPassword(e: any) {
    this.selectedPassword = e.password;
    this.passwordDialogVisible = true;
  }


  loadExamListLazily($event: TableLazyLoadEvent) {
    this.urlSearchParam.set('paged', true)
    this.urlSearchParam.set('page', $event.first)
    this.fetchExamList(this.urlSearchParam);
  }

  private fetchExamList(urlSearchParam: any) {
    let searchModel = new ExamSearchModel();
    searchModel.examLevel = this.createExamForm.get('examLevel').value;
    searchModel.session = this.createExamForm.get('session').value;
    searchModel.year = this.createExamForm.get('year').value;

    if (!searchModel.examLevel) return;
    if (!searchModel.session) return;
    if (!searchModel.year) return;

   this.subscribers.examConfigSubs = this.examConfgurationService.fetchExamList(urlSearchParam, searchModel).subscribe(data => {
      if (data.result) {
        this.examList = data.data.dataList;
      }
    })
  }

  onSearchRequiredFieldChange() {
    this.examList = []
    this.fetchExamList(this.urlSearchParam)
  }

  private setupActionMenu() {
    this.actionMenu = [
      {
        label: '',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => {
              this.editMode = true;
              let e = this.examList[this.activeRowIndex];
              e.examDate = new Date(e.examDate);
              this.createExamForm.patchValue(e);

            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this exam configuration? this can not be undone!',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                  this.deleteExamConfig();
                },
                reject: (type) => {

                }
              });
            }
          }
        ]
      },
    ];
  }

  private deleteExamConfig() {
    let e = this.examList[this.activeRowIndex];
   this.subscribers.examConfigSubs2 = this.examConfgurationService.deleteExamConfig(e).subscribe(apiResponse => {
      this.fetchExamList(this.urlSearchParam)
      if (apiResponse.result) {
        this.messageService.add({
          summary: 'Deleted !',
          detail: 'Exam Configuration Deleted !',
          severity: 'info'
        })
      }
    })
  }

  private clearInput() {
    this.createExamForm.controls['examName'].setValue(null);
    this.createExamForm.controls['examDate'].setValue(null);
    this.createExamForm.controls['password'].setValue(null);
  }
}
