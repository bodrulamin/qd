import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {AnswerPaperAssessmentService} from "../service/answer-paper-assessment.service";
import {QuestionDetailModel} from "../../question/edit-question/service/domain/question.model";
import generatePdfThumbnails from 'pdf-thumbnails-generator';
import html2canvas from "html2canvas";
import {AnswerModel, ExamQuestionModel} from "../../../student/exam-paper/service/domain/exam-question.model";
import {ExamPaperService} from "../../../student/exam-paper/service/exam-paper.service";
import {AddMarkModel} from "../service/domain/answer-paper-assessment.model";

@Component({
  selector: 'app-answer-paper-assessment',
  templateUrl: './answer-paper-assessment.component.html',
  styleUrls: ['./answer-paper-assessment.component.css']
})
export class AnswerPaperAssessmentComponent extends BaseComponent {
  examInfo: any;
  quesSeqList: number[] = [];
  answerPaperMarkingVisible: boolean = false;
  selectedPaperSl: number = 0;
  answerPaperFullInfo: any;
  questionDetails: QuestionDetailModel[] = [];
  selectedIndex: number = -1;
  questionSelected: boolean = false;
  thumbnailBlobMap = new Map();
  pdfBlobMap = new Map();
  answerDetails: AnswerModel[] = [];
  marksDetails: AddMarkModel[] = [];

  constructor(
    public messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examPaperService: ExamPaperService,
    private answerPaperAssessmentService: AnswerPaperAssessmentService
  ) {
    super();
    if (!history.state) {
      this.router.navigate(['../']);
      console.log('state empty')
    }
    this.examInfo = history.state.examInfo;
    this.quesSeqList = history.state.quesSeqList;
  }


  assessPaper(s: number) {
    let a = this.examInfo;
    a.seqNo = s;
    this.answerPaperAssessmentService.assessPaper(a).subscribe({
      next: apiResponse => {
        console.log(apiResponse)
        if (apiResponse.result) {
          this.answerPaperMarkingVisible = true;
          this.selectedPaperSl = a.seqNo;
          this.answerPaperFullInfo = apiResponse.data;
          this.questionDetails = apiResponse.data.quesDetailsList;
          this.setupQuestionsAnswers(apiResponse.data)
        }
      }
    })
  }

  selectQuestion(i) {
    this.questionSelected = true;
    this.selectedIndex = i;
    console.log(this.marksDetails)
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
    let element = document.getElementById('html-preview');
    element.innerHTML = this.questionDetails[i].quesDesc;
    if (!this.questionDetails[i].quesDesc) return;
    html2canvas(element).then(canvas => {
      let blobUrl = canvas.toDataURL('image/png');
      this.thumbnailBlobMap.set(this.questionDetails[i].id, blobUrl)
      element.innerHTML = '';
    });

  }

  private async setupQuestionsAnswers(data: ExamQuestionModel) {
    this.questionDetails = data.quesDetailsList;
    this.answerDetails = data.answerVmList;
    for (let i = 0; i < this.questionDetails.length; i++) {
      this.marksDetails[i] = new AddMarkModel();
      this.marksDetails[i].answerId = this.answerDetails[i].id;
      this.marksDetails[i].quesDetailsId = this.questionDetails[i].id;
      this.marksDetails[i].enrollmentId = this.answerDetails[i].enrolmentId;
      this.marksDetails[i].assignmentId = data.assignmentId;

      if (this.questionDetails[i].isFile) {
        this.generateFileBlobsFromApi(i, this.questionDetails[i].fileUrl);
      } else {
        await this.generateHtmlThumbnails(i);
      }
    }
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

  saveMarks(i: number) {
    console.log(this.marksDetails);
    this.answerPaperAssessmentService.addMark(this.marksDetails[i]).subscribe({
      next: apiResponse => {
        if (apiResponse){
          this.marksDetails[i].id = apiResponse.data;
        }
      this.showApiRemarks(apiResponse);
      }
    })

  }
}
