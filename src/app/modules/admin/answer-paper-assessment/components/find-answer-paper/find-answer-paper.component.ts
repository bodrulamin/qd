import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AnswerPaperAssessmentService} from "../../service/answer-paper-assessment.service";
import {AdminService} from "../../../service/admin.service";
import {BaseComponent} from "../../../../base/components/base-component/base.component";

@Component({
  selector: 'app-find-answer-paper',
  templateUrl: './find-answer-paper.component.html',
  styleUrls: ['./find-answer-paper.component.css']
})
export class FindAnswerPaperComponent extends BaseComponent {

  examLevelOptions: any[] = [];
  sessionOptions = [];
  yearOptions = [];
  subjectOptions = [];
  privLevelCodeOptions = [];

  answerPapaerSearchForm: FormGroup;
  private required_field = {
    examLevel: 'Exam Level',
    session: 'Session',
    year: 'Year',
    subjectCode: 'Subject',
  };

  answerPaperSequenceList: number[] = [];
  examLevelMap: Map<any, any> = new Map();
  subjectMap: Map<any, any> = new Map();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private assignExaminerService: AnswerPaperAssessmentService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
  ) {
    super();
    this.prepareExaminerSearchForm();
    this.fetchConfiguration();
  }


  private prepareExaminerSearchForm() {
    this.answerPapaerSearchForm = this.formBuilder.group({
      examLevel: [null, Validators.required],
      session: [null, Validators.required],
      year: [null, [Validators.required]],
      subjectCode: [null, [Validators.required]],
    });
  }

  searchAnswerPapers() {
    this.answerPaperSequenceList = [];
    if (this.formInvalid()) return;
    this.assignExaminerService.setLastSearchData(this.answerPapaerSearchForm.value)
    this.subscribers.searchAnswerpaperssubs = this.assignExaminerService.searchAnswerPapers(this.answerPapaerSearchForm.value).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.answerPaperSequenceList = apiResponse.data.quesSeqList
        this.router.navigate(['1'], {
          relativeTo: this.activatedRoute,
          state: {examInfo: this.answerPapaerSearchForm.value, quesSeqList: this.answerPaperSequenceList}
        })
      }
    });


  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.answerPapaerSearchForm)
    this.showRequiredErrorMessage(this.answerPapaerSearchForm, this.required_field)
    return this.answerPapaerSearchForm.invalid;
  }


  private fetchConfiguration() {
    this.subscribers.confSubs = this.adminService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        this.examLevelOptions = apiResponse.data.examLevelList;
        this.sessionOptions = apiResponse.data.examSessionList;
        this.yearOptions = apiResponse.data.examYearList;
        this.privLevelCodeOptions = apiResponse.data.privLevelList;
        apiResponse.data.examLevelList.forEach(e => {
          this.examLevelMap.set(e.code, e.name);
          e.subList.forEach(s => {
            this.subjectMap.set(s.code, s.name);
          })
        });
        this.assignExaminerService.getLastSearchModel().subscribe(
          {
            next: data => {
              this.answerPapaerSearchForm.patchValue(data);
              this.subjectOptions = data.examLevel ? this.examLevelOptions.find(l => l.code === data.examLevel).subList : [];

            }
          });
      }
    })
  }

  onExamLevelChange(examLevel: any) {
    this.answerPapaerSearchForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = examLevel ? this.examLevelOptions.find(l => l.code === examLevel).subList : [];
    this.clearExaminerData();
  }

  clearExaminerData() {
    this.answerPaperSequenceList = [];
  }

  onExamLevelClear() {
    this.answerPapaerSearchForm.controls['subjectCode'].setValue(null)
    this.subjectOptions = []
    this.clearExaminerData();
  }

  clearExamList(examLevel: any) {
    this.answerPaperSequenceList = []
  }


}
