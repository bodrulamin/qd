import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionCreatorService} from "../service/question-creator.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {QuestionCreatorModel} from "../service/domain/question-creator.model";
import {AdminService} from "../../service/admin.service";
import {UserModel} from "../../user-lookup-template/service/domain/usre.lookup.model";
import {DatePipe} from "@angular/common";

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
  selectedIndex: number = -1;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private questionCreatorService: QuestionCreatorService,
    private adminService: AdminService,
    private datePipe:DatePipe,
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
    this.questionCreatorService.setLastSearchData(this.questionCreatorSearchForm.value)
    this.subscribers.examScheduleSubs = this.questionCreatorService.searchQuestionCreator(this.questionCreatorSearchForm.value).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.questionCreatorList = apiResponse.data
        this.questionCreatorList.forEach(e=>{
          if (e.allowDateUpto){
            e.allowDateUpto = new Date(e.allowDateUpto);
          }
        })
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

        this.questionCreatorService.getLastSearchModel().subscribe(
          {
            next: data => {
              this.questionCreatorSearchForm.patchValue(data);
              // this.subjectOptions = data.examLevel ? this.examLevelOptions.find(l => l.code === data.examLevel).subList : [];

            }
          });

      }
    })
  }


  clearExamList(examLevel: any) {
    this.questionCreatorList = []
  }

  onExamLevelClear() {
    this.questionCreatorList = []
  }



  onUnAssignClicked(e: any) {
    this.questionCreatorService.deleteQuestionCreator({id: e.id}).subscribe({
      next: apiResponse => {
        this.searchQuestionCreator();
        if (apiResponse.result) {
          this.showApiRemarks(apiResponse);
        }

      }
    })
  }

  onAssignPersonClick(index: any) {
    this.selectedIndex = index;
    this.userLookupVisible = true;
  }

  onUserSelect(user: UserModel) {
    this.userLookupVisible = false;
    this.questionCreatorList[this.selectedIndex].userId = user.id;
    this.questionCreatorList[this.selectedIndex].assignedPerson = user.fullName;

  }

  onAssignClicked(e:any) {
    if(!this.validated(e)) return;
    e.allowDateUpto = this.datePipe.transform(e.allowDateUpto,'yyyy-MM-dd')
    this.questionCreatorService.assignQuestionCreator(e).subscribe({
      next: apiResponse => {
        this.searchQuestionCreator();
        if (apiResponse.result){
          this.showApiRemarks(apiResponse)
        }
      }
    })
  }

  private validated(e) {
    if(!e.allowDateUpto) {
      this.messageService.add({summary:'Error',detail:'Input Date allowed upto', severity:'error'})
      return false;
    }
    if (!e.userId){
      this.messageService.add({summary:'Error',detail:'Select Assigned Person', severity:'error'})
      return false;
    }
    return true;
  }
}
