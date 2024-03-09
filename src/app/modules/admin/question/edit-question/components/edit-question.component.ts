import {Component, ViewChild} from '@angular/core';
import {Editor, EditorTextChangeEvent} from "primeng/editor";
import {ConfirmationService, MessageService} from "primeng/api";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {ActivatedRoute} from "@angular/router";
import {QuestionDetailModel, QuestionModel} from "../service/domain/question.model";
import {EditQuestionService} from "../service/edit-question.service";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
  providers: []
})
export class EditQuestionComponent extends BaseComponent {
  questionDetail: QuestionDetailModel = new QuestionDetailModel();
  questionMaster: QuestionModel = new QuestionModel();
  questionDetails: QuestionDetailModel[] = [];
  private selectedIndex: number = -1;
  @ViewChild("editor") editor!: Editor;
  questionSelected = false;
  editQuestionForm: FormGroup;
  formData: FormData = new FormData();
  private id: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private editQuestionService: EditQuestionService,
    public layoutService: LayoutService,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.prepareCreateQuestionForm();
    this.questionMaster = history.state.data;

  }

  private prepareCreateQuestionForm() {
    this.editQuestionForm = this.formBuilder.group({
      examLevel: ['', Validators.required],
      session: ['', Validators.required],
      year: ['', [Validators.required]],
      subjectCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.fetchExistingQuestion(this.id);
      }
    });
  }


  selectQuestion(i: number) {
    this.questionSelected = true;
    this.questionDetails[this.selectedIndex] = this.questionDetail;
    this.selectedIndex = i;
    this.questionDetail = this.questionDetails[this.selectedIndex];
    setTimeout(() => {
      this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.questionDetail.quesDesc
    }, 5)

  }

  onTextChange($event: EditorTextChangeEvent, editor: Editor) {
    // console.log($event);
    // console.log(this.questionDetail.quesDesc);
  }

  onQuestionDelete(i: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this question? this can not be undone!',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.questionDetails.splice(i, 1);
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Question Deleted'});
      },
      reject: (type) => {

      }
    });
  }

  saveQuestion() {
    if (this.selectedIndex < 0) return;
    this.questionMaster.quesDetail = this.questionDetail;
    let data = JSON.stringify(this.questionMaster);
    this.formData.append('data', data);
    this.editQuestionService.addQuestion(this.formData).subscribe(apiResponse => {
      let data = apiResponse.data
      this.setupExistingQuestion(data);
    });
  }

  addNewQuestion() {
    let qd = new QuestionDetailModel();
    qd.quesDesc = '';
    qd.seqNo = this.questionDetails.length + 1;
    this.questionDetails.push(qd);

    if (!this.questionDetails.length) {
      this.selectQuestion(0);
    }

  }

  private fetchExistingQuestion(id: any) {
    let urlSearchParam = new Map();
    urlSearchParam.set('questionId', id)
    this.editQuestionService.fetchExistingQuestion(urlSearchParam).subscribe(apiResponse => {
      if (apiResponse.result) {
        let data = apiResponse.data
        this.setupExistingQuestion(data);

      }
    })
  }

  private setupExistingQuestion(data) {
    this.questionMaster = new QuestionModel();
    this.questionMaster.id = data.id;
    this.questionMaster.examLevel = data.examLevel;
    this.questionMaster.session = data.session;
    this.questionMaster.year = data.year;
    this.questionMaster.subjectCode = data.subjectCode;

    data.quesDetailsList.forEach(e => {
      e.marks = e.marks ? e.marks : 0;
      this.questionDetails.push(e);
    });
  }
}
