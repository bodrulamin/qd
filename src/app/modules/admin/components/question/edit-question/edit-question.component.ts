import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionModel} from "../../../service/domain/question.model";
import {Editor, EditorTextChangeEvent} from "primeng/editor";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent {
  question: QuestionModel = new QuestionModel() ;
  questions: QuestionModel[] = [];
  private selectedIndex: number = -1;
  text: any = 'helloworld';
  @ViewChild("editor") editor!: Editor;

  constructor() {
  }

  ngOnInit(){
    for (let i = 0; i < 5; i++) {
      let q = new QuestionModel();
      q.id = i+1;
      q.code = 101 + i;
      q.session = "2021-2022";
      q.status = 'DRAFT';
      q.html = '<p> question '+ i + '</p>';
      q.marks = 10 + 4 + i;
      this.questions.push(q);
    }

  }


  selectQuestion(i: number) {
    this.questions[this.selectedIndex] = this.question;
    this.selectedIndex = i;
    this.question = this.questions[this.selectedIndex];
    setTimeout(()=>{
      this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.question.html
    },5)

  }

  onTextChange($event: EditorTextChangeEvent, editor: Editor) {

  }
}
