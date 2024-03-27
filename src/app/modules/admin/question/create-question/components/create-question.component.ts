import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {CreateQuestionService} from "../service/create-question.service";
import {MessageService} from "primeng/api";
import {AdminService} from "../../../service/admin.service";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent extends BaseComponent {
  examLevelOptions: any[] = [];
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
    subjectCode: 'Subject',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    public messageService: MessageService,
    private createQuestionService: CreateQuestionService,
    private adminService :AdminService,
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
      subjectCode: [null, Validators.required]
    });
  }


  searchQuestion() {
    if (this.formInvalid()) return;
    this.createQuestionService.setLastSearchData(this.createQuestionForm.value);
    this.subscribers.searchQsubs= this.createQuestionService.searchQuestion(this.createQuestionForm.value).subscribe(apiResponse => {
      if (apiResponse.result) {
        if (apiResponse.data.isNew) {
          this.messageService.add({summary: 'Creating new question', detail: '', severity: 'success'})
          this.router.navigate(["../edit-question"], {
            state: {data: this.createQuestionForm.value},
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
        this.createQuestionService.getLastSearchModel().subscribe(
          {
            next: data => {
              this.createQuestionForm.patchValue(data);
              this.subjectOptions = data.examLevel ? this.examLevelOptions.find(l => l.code === data.examLevel).subList : [];

            }
          });
      }
    })
  }


  onExamLevelChange(examLevel: any) {
    this.createQuestionForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = examLevel ? this.examLevelOptions.find(l => l.code === examLevel).subList : [];
  }

  onExamLevelClear() {
    this.createQuestionForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = []
  }
}
