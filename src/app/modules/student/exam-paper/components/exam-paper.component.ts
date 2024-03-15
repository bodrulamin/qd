import { Component } from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";
import html2canvas from 'html2canvas';
import generatePdfThumbnails from 'pdf-thumbnails-generator';
import {ExamPaperService} from "../service/exam-paper.service";
import {ExamQuestionDetailModel, ExamQuestionModel} from "../service/domain/exam-question.model";

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.css']
})
export class ExamPaperComponent extends BaseComponent{

  thumbnailBlobMap = new Map();
  pdfBlobMap = new Map();
  questionDetails: ExamQuestionDetailModel[] = [];
  questionMaster: ExamQuestionModel = new ExamQuestionModel();

  selectedIndex: number = -1;
  private autoSave: boolean;
  questionDetail:ExamQuestionDetailModel = new ExamQuestionDetailModel();
  private questionSelected: boolean = false;
  constructor(private examPaperService :ExamPaperService) {
    super();

   let data:ExamQuestionModel = history.state;
    this.setupExistingQuestion(data);

   this.questionDetails = data.quesDetailsList;
  }

  selectQuestion(i) {
    this.questionSelected = true;
    this.selectedIndex = i;
    this.questionDetail = this.questionDetails[i];
  }

  private async setupExistingQuestion(data:ExamQuestionModel) {
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
    // let element = this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0];
    // this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.questionDetails[i].quesDesc
    let element = document.getElementById('preview')
    // element.innerHTML = this.questionDetails[i].quesDesc;
    if (!this.questionDetails[i].quesDesc) return;
    html2canvas(element).then(canvas => {
      let blobUrl = canvas.toDataURL('image/png');
      this.thumbnailBlobMap.set(this.questionDetails[i].id, blobUrl)

    });

  }
}
