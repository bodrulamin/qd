import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionCreatorService} from "../service/question-creator.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {AssignCreatorModel, QuestionCreatorModel} from "../service/domain/question-creator.model";
import {AdminService} from "../../service/admin.service";
import {UserModel} from "../../user-lookup-template/service/domain/usre.lookup.model";

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
})
export class QuestionCreatorComponent extends BaseComponent {
  examLevelOptions: any[] = [];
  sessionOptions = [];
  yearOptions = [];
  questionCreatorSearchForm: FormGroup;
  private required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
  };
  questionCreatorList: QuestionCreatorModel[] = [];
  userLookupVisible: boolean = false;
  selectedCreator: QuestionCreatorModel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private questionCreatorService: QuestionCreatorService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
  ) {
    super();
    this.prepareQuestionCreatorSearchForm();
    this.fetchConfiguration();
  }

  private prepareQuestionCreatorSearchForm() {
    this.questionCreatorSearchForm = this.formBuilder.group({
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
    });
  }


  searchQuestionCreator() {
    if (this.formInvalid()) return;
    this.subscribers.examScheduleSubs = this.questionCreatorService.searchQuestionCreator(this.questionCreatorSearchForm.value).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.questionCreatorList = apiResponse.data
      }
    });


  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.questionCreatorSearchForm)
    this.showRequiredErrorMessage(this.questionCreatorSearchForm, this.required_field)
    return this.questionCreatorSearchForm.invalid;
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
    this.questionCreatorList = []
  }

  onExamLevelClear() {
    this.questionCreatorList = []
  }


  onAssignClicked(creatorModel: QuestionCreatorModel) {
    this.selectedCreator = creatorModel;
    this.userLookupVisible = true;
  }

  onUnAssignClicked(e: any) {
    this.questionCreatorService.deleteQuestionCreator({id: e.id}).subscribe({
      next: apiResponse => {
        this.searchQuestionCreator();
        if (apiResponse.result) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: apiResponse.remarks.join(", ")})
        }

      }
    })
  }

  onUserSelect(user: UserModel) {
    this.userLookupVisible = false;

    this.assignUser(user);
  }

  private assignUser(user: UserModel) {
    this.selectedCreator.userId = user.id;

    this.questionCreatorService.assignQuestionCreator(this.selectedCreator).subscribe({
      next: apiResponse => {
        this.searchQuestionCreator();
      }
    })
  }
}
