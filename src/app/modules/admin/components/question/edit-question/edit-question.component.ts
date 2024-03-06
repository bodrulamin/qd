import {Component, ViewChild} from '@angular/core';
import {QuestionModel} from "../../../service/domain/question.model";
import {Editor, EditorTextChangeEvent} from "primeng/editor";
import {ConfirmationService, MessageService} from "primeng/api";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
  providers: []
})
export class EditQuestionComponent extends BaseComponent {
  question: QuestionModel = new QuestionModel();
  questions: QuestionModel[] = [];
  private selectedIndex: number = -1;
  text: any = 'helloworld';
  @ViewChild("editor") editor!: Editor;
  questionSelected = false;
  protected editQuestionForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder:FormBuilder
  ) {
    super();
    this.prepareCreateQuestionForm();
  }

  private prepareCreateQuestionForm() {
    this.editQuestionForm = this.formBuilder.group({
      examLevel: ['', Validators.required],
      session: ['', Validators.required],
      year: ['', [Validators.required]],
      subject: ['', Validators.required]
    });
  }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      let q = new QuestionModel();
      q.id = i + 1;
      q.code = 101 + i;
      q.session = "2021-2022";
      q.status = 'DRAFT';
      q.html = '<p> question ' + i + '</p>';
      q.marks = 10 + 4 + i;
      this.questions.push(q);
    }

  }


  selectQuestion(i: number) {
    this.questionSelected = true;
    this.questions[this.selectedIndex] = this.question;
    this.selectedIndex = i;
    this.question = this.questions[this.selectedIndex];
    setTimeout(() => {
      this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.question.html
    }, 5)

  }

  onTextChange($event: EditorTextChangeEvent, editor: Editor) {

  }

  onQuestionDelete(i: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this question? this can not be undone!',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.questions.splice(i, 1);
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Question Deleted'});
      },
      reject: (type) => {

      }
    });
  }
}
