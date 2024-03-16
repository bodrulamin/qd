import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {LayoutService} from "../../layout/service/app.layout.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {SubjectCofigService} from "../service/subject-cofig.service";
import {SubjectModel} from "../service/domain/subject.model";
import {AdminService} from "../../service/admin.service";


@Component({
  selector: 'app-subject-configuration',
  templateUrl: './subject-configuration.component.html',
  styleUrls: ['./subject-configuration.component.css']
})
export class SubjectConfigurationComponent extends BaseComponent {
  examLevelOptions: any[] = [];
  sessionOptions = [];
  createSubjectForm: FormGroup;
  private required_field = {
    examLevelCode: 'Exam Level',
    subjectName: 'Subject Name',
    subjectCode: 'Subject Code',
  };
  editMode = false;
  subjectList: any;
  selectedExamLevel = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    private subjectCofigService: SubjectCofigService,
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.prepareCreateSubjectForm();
    this.fetchConfiguration();
  }

  private prepareCreateSubjectForm() {
    this.createSubjectForm = this.formBuilder.group({
      id: [0],
      examLevelCode: [null, Validators.required],
      subjectName: [null, [Validators.required]],
      subjectCode: [null, Validators.required]
    });
  }


  createSubject() {
    if (this.formInvalid()) return;
    if (this.editMode) {
      this.subjectCofigService.addSubject(this.createSubjectForm.value).subscribe(apiResponse => {
        if (apiResponse.result) {
          this.messageService.add({summary: 'Successful', severity: 'success', detail: 'Subject Edited Successfully'})
          this.fetchConfiguration();
        }
      })
    } else {
      delete this.createSubjectForm.value['id'];
      this.subjectCofigService.addSubject(this.createSubjectForm.value).subscribe(apiResponse => {
        if (apiResponse.result) {
          this.fetchConfiguration();
          this.messageService.add({summary: 'Successful', severity: 'success', detail: 'Subject Added Successfully'})
        }
      });
    }
    this.editMode = false;
    this.clearInput();
    this.markFormGroupAsUnTouched(this.createSubjectForm);

  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.createSubjectForm)
    this.showRequiredErrorMessage(this.createSubjectForm, this.required_field)
    return this.createSubjectForm.invalid;
  }

  private fetchConfiguration() {
    this.subscribers.confSubs = this.adminService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examLevelOptions = apiResponse.data.examLevelList;
        if (this.selectedExamLevel){
          this.onExamLevelChange(this.selectedExamLevel);
        }
      }
    })
  }

  onExamLevelChange(examLevel: any) {
    this.selectedExamLevel = examLevel;
    this.subjectList = examLevel ? this.examLevelOptions.find(l => l.code === examLevel).subList : [];
  }

  onExamLevelClear() {

  }

  editSubject(e: any) {
    this.editMode = true;
    this.createSubjectForm.controls['id'].setValue(e.id);
    this.createSubjectForm.controls['subjectName'].setValue(e.name);
    this.createSubjectForm.controls['subjectCode'].setValue(e.code);
  }

  private clearInput() {
    this.createSubjectForm.controls['subjectName'].setValue(null);
    this.createSubjectForm.controls['subjectCode'].setValue(null);
  }

  deleteSubject(e: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this subject configuration? this can not be undone!',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let subjectModel = new SubjectModel();
        subjectModel.id = e.id;
        subjectModel.subjectCode = e.code;
        subjectModel.subjectName = e.name;
        subjectModel.examLevelCode = this.selectedExamLevel;
        this.subjectCofigService.deleteSubject(subjectModel).subscribe(apiResponse=>{
          if (apiResponse.result){
            this.fetchConfiguration();
            this.messageService.add({summary: 'Successful', severity: 'success', detail: 'Subject Deleted Successfully'})
          }
        })      },
      reject: (type) => {

      }
    });

  }
}
