import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {AdminService} from "../../service/admin.service";
import {ExamModel} from "../../service/domain/exam.model";

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent extends BaseComponent {
  examLevelOptions = [];
  sessionOptions = [];
  subjectOptions = [];
  yearOptions = [];
  examDate: any;

  createExamForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
    examName: 'Exam Name',
    examDate: 'Date of Exam',
    examPassword: 'Student Login Password'
  };
  editMode = false;
  examList = [];
  passwordDialogVisible = false;
  actionMenu = [
    {
      label: '',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          command: () => {
            this.editMode = true;
            console.log(this.activeRowIndex)
            let e = this.examList[this.activeRowIndex];
            this.createExamForm.setValue(e);

          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.examList.splice(this.activeRowIndex, 1);
          }
        }
      ]
    },
  ];
  selectedExamPassword = '';
  activeRowIndex: any;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
    super();
    this.prepareCreateExamForm();
    this.generateInitialValue();
    this.fetchConfiguration();

  }

  private prepareCreateExamForm() {
    this.createExamForm = this.formBuilder.group({
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
      examName: [null, Validators.required],
      examDate: [null, Validators.required],
      examPassword: [null, Validators.required],
    });
  }

  submit() {
    if (this.formInvalid()) return;
    if (this.editMode) {
      this.examList[this.activeRowIndex] = this.createExamForm.value;
    } else {
      this.examList.push(this.createExamForm.value);
    }
    this.editMode = false;
    this.prepareCreateExamForm();

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
      }
    })
  }

  showPassword(e: any) {
    this.selectedExamPassword = e.examPassword;
    this.passwordDialogVisible = true;
  }


}
