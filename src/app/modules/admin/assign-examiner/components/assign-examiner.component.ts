import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssignExaminerService} from "../service/assign-examiner.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {AssignExaminerModel} from "../service/domain/assign-examiner.model";
import {AdminService} from "../../service/admin.service";
import {UserModel} from "../../user-lookup-template/service/domain/usre.lookup.model";

@Component({
  selector: 'app-question-creator',
  templateUrl: './assign-examiner.component.html',
  styleUrls: ['./assign-examiner.component.css']
})
export class AssignExaminerComponent extends BaseComponent {
  examLevelOptions: any[] = [];
  sessionOptions = [];
  yearOptions = [];
  subjectOptions = [];
  privLevelCodeOptions = [];

  examinerSearchForm: FormGroup;
  createExaminerForm: FormGroup;
  private required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
    subjectCode: 'Subject',
  };
  private examiner_required_field = {
    answerPaperSerialStart: 'Start SL',
    answerPaperSerialEnd: 'End SL',
    assignedUserId: 'Assigned Person',
    privLevelCode: 'Examiner Type',
  };
  examinerList: AssignExaminerModel[] = [];
  userLookupVisible: boolean = false;
  answerPaperCount: number;
  actionMenu = [];
  activeRowIndex: any;
  editMode: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private assignExaminerService: AssignExaminerService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    super();
    this.prepareExaminerSearchForm();
    this.prepareCreateExaminerForm();
    this.fetchConfiguration();
    this.setupActionMenu();
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
              let e = this.examinerList[this.activeRowIndex];
              this.createExaminerForm.patchValue(e);

            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this examiner assignment? this can not be undone!',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                  this.deleteExaminerAssignment();
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

  private prepareExaminerSearchForm() {
    this.examinerSearchForm = this.formBuilder.group({
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
      subjectCode: [null, [Validators.required]],
    });
  }

  private prepareCreateExaminerForm() {
    this.createExaminerForm = this.formBuilder.group({
      id: [null],
      answerPaperSerialStart: [null, Validators.required],
      answerPaperSerialEnd: [null, [Validators.required]],
      subjectCode: [null, [Validators.required]],
      examLevel: [null, [Validators.required]],
      session: [null, [Validators.required]],
      year: [null, [Validators.required]],
      privLevelCode: [null, [Validators.required]],
      assignedUserId: [null, [Validators.required]],
      assignedUsername: [''],
    });
  }


  searchExaminer() {
    if (this.formInvalid()) return;
    this.subscribers.searchExaminersubs = this.assignExaminerService.searchExaminer(this.examinerSearchForm.value).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examinerList = apiResponse.data.assignList
        this.answerPaperCount = apiResponse.data.count;
      }
    });


  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.examinerSearchForm)
    this.showRequiredErrorMessage(this.examinerSearchForm, this.required_field)
    return this.examinerSearchForm.invalid;
  }

  private examinerFormInvalid() {
    this.markFormGroupAsTouched(this.createExaminerForm)
    this.showRequiredErrorMessage(this.createExaminerForm, this.examiner_required_field)
    return this.createExaminerForm.invalid;
  }

  private fetchConfiguration() {
    this.subscribers.confSubs = this.adminService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examLevelOptions = apiResponse.data.examLevelList;
        this.sessionOptions = apiResponse.data.examSessionList;
        this.yearOptions = apiResponse.data.examYearList;
        this.privLevelCodeOptions = apiResponse.data.privLevelList;
      }
    })
  }

  onExamLevelChange(examLevel: any) {
    this.examinerSearchForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = examLevel ? this.examLevelOptions.find(l => l.code === examLevel).subList : [];
  }

  onExamLevelClear() {
    this.examinerSearchForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = []
  }

  clearExamList(examLevel: any) {
    this.examinerList = []
  }


  onAssignClicked(creatorModel: AssignExaminerModel) {
    this.userLookupVisible = true;
  }


  onUserSelect(user: UserModel) {
    this.userLookupVisible = false;
    this.createExaminerForm.controls['assignedUserId'].setValue(user.id);
    this.createExaminerForm.controls['assignedUsername'].setValue(user.email);
  }

  private updateExaminer() {
    if (this.formInvalid()) return;
    this.createExaminerForm.patchValue(this.examinerSearchForm.value)
    if (this.examinerFormInvalid()) return;
    this.createExaminerForm.patchValue(this.examinerSearchForm.value)
    this.assignExaminerService.assignExaminer(this.createExaminerForm.value).subscribe({
      next: apiResponse => {
        this.prepareCreateExaminerForm();
        this.searchExaminer();
      }
    })
  }

  private deleteExaminerAssignment() {
    let e = this.examinerList[this.activeRowIndex];
    this.subscribers.examConfigSubs2 = this.assignExaminerService.deleteExaminerAssignment(e).subscribe(apiResponse => {
      this.searchExaminer();
      if (apiResponse.result) {
        this.messageService.add({
          summary: 'Deleted !',
          detail: 'Examiner Assignment Deleted !',
          severity: 'info'
        })
      }
    })
  }

  addExaminer() {
    this.updateExaminer();
  }

  usernameClicked($event: MouseEvent) {
    this.userLookupVisible = true
  }
}
