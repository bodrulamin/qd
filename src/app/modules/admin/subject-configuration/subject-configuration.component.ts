import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../base/components/base-component/base.component";
import {LayoutService} from "../layout/service/app.layout.service";
import {AdminService} from "../service/admin.service";
import {MessageService} from "primeng/api";


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
    private adminService: AdminService,
    private messageService: MessageService,
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
      this.adminService.addSubject(this.createSubjectForm.value).subscribe(apiResponse => {
        if (apiResponse.result) {

        }
      })
    } else {
      delete this.createSubjectForm.value['id'];
      this.adminService.addSubject(this.createSubjectForm.value).subscribe(apiResponse => {
        if (apiResponse.result) {
          this.messageService.add({summary: 'Successful', severity: 'success', detail: 'Subject Added Successfully'})
        }
      })
    }
    this.editMode = false;
    this.prepareCreateSubjectForm();

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
      }
    })
  }


  onExamLevelChange(examLevel: any) {
    this.selectedExamLevel = examLevel;
    this.subjectList = examLevel ? this.examLevelOptions.find(l=> l.code === examLevel).subList : [];
  }

  onExamLevelClear() {

  }
}
