import {Component, ElementRef, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";
import html2canvas from 'html2canvas';
import generatePdfThumbnails from 'pdf-thumbnails-generator';
import {ExamPaperService} from "../service/exam-paper.service";
import {AnswerModel, ExamInfo, ExamQuestionDetailModel, ExamQuestionModel} from "../service/domain/exam-question.model";
import {Router} from "@angular/router";
import {Editor} from "primeng/editor";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.css']
})
export class ExamPaperComponent extends BaseComponent {

  examInfo: ExamInfo = new ExamInfo();
  answer: AnswerModel = new AnswerModel();
  thumbnailBlobMap = new Map();
  pdfBlobMap = new Map();
  questionDetails: ExamQuestionDetailModel[] = [];
  answerDetails: AnswerModel[] = [];
  questionMaster: ExamQuestionModel = new ExamQuestionModel();
  @ViewChild('thumbview', { static: true }) thumbview: ElementRef;

  @ViewChild("editor") editor!: Editor;
  @ViewChild("pdfView") pdfView!: ElementRef;

  selectedIndex: number = -1;
  autoSave: boolean;
  questionDetail: ExamQuestionDetailModel = new ExamQuestionDetailModel();
  questionSelected: boolean = false;

  constructor(private examPaperService: ExamPaperService, private router: Router, private messageService: MessageService) {
    super();

    let data: ExamQuestionModel = history.state;
    this.examInfo = history.state
    console.log(history.state)
    if (!data || !data.id) {
      // this.router.navigate([""])
    }

    this.setupExistingQuestion(data);

    this.questionDetails = data.quesDetailsList;
  }

  selectQuestion(i) {
    this.answerDetails[this.selectedIndex] = this.answer;
    this.questionSelected = true;
    this.selectedIndex = i;
    this.questionDetail = this.questionDetails[i];
    this.answer = this.answerDetails[i] || new AnswerModel();
    setTimeout(() => {
      this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.answer.answerDesc || ''
    }, 1)

  }

  private async setupExistingQuestion(data: ExamQuestionModel) {
    this.questionMaster.id = data.id;
    for (let i = 0; i < data.quesDetailsList.length; i++) {
      this.questionDetails[i] = data.quesDetailsList[i];
      if (this.questionDetails[i].isFile) {
        this.generateFileBlobsFromApi(i, this.questionDetails[i].fileUrl);
      } else {
        await this.generateHtmlThumbnails(i);
        // this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = ''
      }
    }
    this.autoSave = true;
  }

  generateFileBlobsFromApi(i: number, fileUrl: string) {
    let urlParam = new Map();
    urlParam.set('filePath', fileUrl)
    this.examPaperService.fetchByFileUrl(urlParam).subscribe(data => {
      var file = new Blob([data], {type: 'application/pdf'});
      let blobUrl = URL.createObjectURL(file);
      this.pdfBlobMap.set(this.questionDetails[i].id, blobUrl)
      this.generatePdfThumbnails(i)
    })
  }

  async generatePdfThumbnails(i: number) {
    try {
      const thumbnails = await generatePdfThumbnails(this.pdfBlobMap.get(this.questionDetails[i].id), 500);
      this.thumbnailBlobMap.set(this.questionDetails[i].id, thumbnails[0].thumbnail)
    } catch (err) {
      console.error(err);
    }

  }

  async generateHtmlThumbnails(i: number) {
    // console.log(this.thumbview)
    // let element  = this.thumbview.nativeElement
    // element.innerHTML = this.questionDetails[i].quesDesc;
    // if (!this.questionDetails[i].quesDesc) return;
    // html2canvas(element).then(canvas => {
    //   let blobUrl = canvas.toDataURL('image/png');
    //   this.thumbnailBlobMap.set(this.questionDetails[i].id, blobUrl)
    //
    // });

  }

  onTextChange($event: any, editor: Editor) {

  }

  autoSaveAnser() {
    // this.saveAnser(this.questionMaster, this.selectedIndex);
  }

  private saveAnser(questionMaster: ExamQuestionModel, i: number) {
    let answerModel: AnswerModel = new AnswerModel();
    answerModel.quesId = questionMaster.id;
    answerModel.answerDesc = this.answerDetails[i].answerDesc
    answerModel.studentId = this.examInfo.studentId;
    answerModel.enrolmentId = this.examInfo.enrollmentId;
    answerModel.quesSeq = this.answerDetails[i].quesSeq;
    answerModel.id = this.answerDetails[i].id;

    this.examPaperService.submitAnswer(answerModel).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.answerDetails[i].id = apiResponse.data.id;
        this.messageService.add({
          summary: 'saved',
          detail: 'Answer Saved for ' + this.answerDetails[i].quesSeq,
          severity: 'success'
        });

      }
    })
  }

  updatePdfSize() {
    if (this.pdfView) {
      this.pdfView.nativeElement.updateSize();
    }
  }

  manualSave() {
    if (this.selectedIndex < 0) {
      return;
    }
    this.answer.quesSeq = this.questionDetails[this.selectedIndex].seqNo;
    this.answerDetails[this.selectedIndex] = this.answer;
    this.saveAnser(this.questionMaster, this.selectedIndex);
  }
}
