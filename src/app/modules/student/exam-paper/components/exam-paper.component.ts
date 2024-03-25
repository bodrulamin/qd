import {AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";
import generatePdfThumbnails from 'pdf-thumbnails-generator';
import {ExamPaperService} from "../service/exam-paper.service";
import {
  AnswerModel,
  AnswerQueryModel,
  ExamInfo,
  ExamQuestionDetailModel,
  ExamQuestionModel
} from "../service/domain/exam-question.model";
import {NavigationEnd, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdminService} from "../../../admin/service/admin.service";
import html2canvas from "html2canvas";
import {EventObj} from "@tinymce/tinymce-angular/editor/Events";
import {filter} from "rxjs/operators";

declare var luckysheet;

export enum SaveAction {
  saveAll, submit, autoSave
}

@Injectable({providedIn: 'root'})
export class NavigationTrackerService {
  isFirstLoad = true;
}

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.css']
})
export class ExamPaperComponent extends BaseComponent implements OnInit, AfterViewInit {

  examInfo: ExamInfo = new ExamInfo();
  thumbnailBlobMap = new Map();
  pdfBlobMap = new Map();
  questionDetails: ExamQuestionDetailModel[] = [];
  answerDetails: AnswerModel[] = [];
  questionMaster: ExamQuestionModel = new ExamQuestionModel();


  // @ViewChild("editor", {static: true}) editor!: Editor;
  @ViewChild("pdfView") pdfView!: ElementRef;

  selectedIndex: number = -1;
  questionSelected: boolean = false;

  examLevelMap: Map<any, any> = new Map();
  remainingTime: any;

  calulatorVisible: boolean = false;
  scientificMode = false;
  showResources: boolean = true;
  pinnedItems: ExamQuestionDetailModel[] = [];
  examOver: boolean = false;
  sheetVisible: boolean = true;
  reviewDialogVisible: boolean = false;
  submitAction: SaveAction = SaveAction.submit;
  saveAction: SaveAction = SaveAction.saveAll;
  changedIndexSet: Set<number> = new Set<number>();
  autoSavetriggered: boolean = false;
  answerQueryData: AnswerQueryModel;


  constructor(
    private examPaperService: ExamPaperService,
    private router: Router,
    private messageService: MessageService,
    private navigationTracker: NavigationTrackerService,
    private adminService: AdminService,
  ) {
    super();
  }

  ngAfterViewInit() {
    if (this.sheetVisible) {
      this.showLuckySheet();
    }
  }

  ngOnInit() {

    let data: ExamQuestionModel = history.state;
    this.examInfo = history.state

    if (!data || !data.id) {
      this.router.navigate([""])
    }

    let remainingTimeInterval = setInterval(() => {
      this.remainingTime = this.getTimeDifference(new Date(), this.examInfo.examEndsAt);
      if (new Date(this.examInfo.examEndsAt).getTime() < new Date().getTime()) {
        this.examOver = true;
        this.remainingTime = '00:00:00';
        clearInterval(remainingTimeInterval);

      }
    }, 1000);
    this.selectedIndex = 0;
    this.setupExistingQuestion(data);

  }

  private showLuckySheet() {
    var options = {
      container: 'luckysheet',
      showtoolbar: true,
      showinfobar: false,
      showtoolbarConfig: {
        undoRedo: true, //Undo redo
        paintFormat: false, //Format brush
        currencyFormat: false, //currency format
        percentageFormat: true, //Percentage format
        numberDecrease: false, //'Decrease the number of decimal places'
        numberIncrease: false, //'Increase the number of decimal places
        moreFormats: false, //'More Formats'
        font: false, //'font'
        fontSize: false, //'Font size'
        bold: true, //'Bold (Ctrl+B)'
        italic: false, //'Italic (Ctrl+I)'
        strikethrough: false, //'Strikethrough (Alt+Shift+5)'
        underline: false, // 'Underline (Alt+Shift+6)'
        textColor: false, //'Text color'
        fillColor: false, //'Cell color'
        border: false, //'border'
        mergeCell: false, //'Merge cells'
        horizontalAlignMode: false, //'Horizontal alignment'
        verticalAlignMode: false, //'Vertical alignment'
        textWrapMode: false, //'Wrap mode'
        textRotateMode: false, //'Text Rotation Mode'
        image: false, // 'Insert picture'
        link: false, // 'Insert link'
        chart: false, //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
        postil: false, //'comment'
        pivotTable: false, //'PivotTable'
        function: true, //'formula'
        frozenMode: false, //'freeze mode'
        sortAndFilter: false, //'Sort and filter'
        conditionalFormat: false, //'Conditional Format'
        dataVerification: false, // 'Data Verification'
        splitColumn: false, //'Split column'
        screenshot: false, //'screenshot'
        findAndReplace: false, //'Find and Replace'
        protection: false, // 'Worksheet protection'
        print: false, // 'Print'
      }
    }
    luckysheet.create(options)
  }

  getTimeDifference(startTime, endTime) {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    const difference = endTime.getTime() - startTime.getTime(); // Note: getTime() for both start and end time
    const differenceInSeconds = difference / 1000; // Convert milliseconds to seconds
    let hours = Math.floor(differenceInSeconds / 3600);
    if (hours < 0) {
      hours = 24 + hours;
    }
    let remainingSeconds = differenceInSeconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    if (minutes < 0) {
      minutes = 60 + minutes;
    }
    let seconds = Math.floor(remainingSeconds % 60);
    if (seconds < 0) {
      seconds = 60 + seconds;
    }
    const hoursAndMinutesAndSeconds = hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    return hoursAndMinutesAndSeconds;
  }

  selectQuestion(i) {
    this.questionSelected = true;
    this.selectedIndex = i;
  }

  private async setupExistingQuestion(data: ExamQuestionModel) {
    this.questionDetails = data.quesDetailsList;
    this.questionMaster.id = data.id;
    for (let i = 0; i < this.questionDetails.length; i++) {
      this.answerDetails[i] = new AnswerModel();
      // generate empty answers
      this.answerDetails[i].quesId = this.questionMaster.id;
      this.answerDetails[i].answerDesc = '';
      this.answerDetails[i].studentUsername = this.examInfo.studentUsername;
      this.answerDetails[i].enrolmentId = this.examInfo.enrollmentId;
      this.answerDetails[i].quesSeq = this.questionDetails[i].seqNo;

      let existingAnswer = data.answerVmList.find(a => a.quesSeq === this.questionDetails[i].seqNo);
      if (existingAnswer) {
        this.answerDetails[i].answerDesc = existingAnswer.answerDesc;
        this.answerDetails[i].id = existingAnswer.id;
      }

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

  private saveSingleAnswer(i: number, suppressMessage = false) {

    this.subscribers.submitAnsSubs = this.examPaperService.submitAnswer([this.answerDetails[i]]).subscribe(apiResponse => {
      if (apiResponse.result) {

        let index = this.answerDetails.findIndex(a => a.quesSeq === apiResponse.data[0].quesSeq);
        this.answerDetails[index].id = apiResponse.data[0].id
        console.log('saved ' + this.answerDetails[index].quesSeq);

        if (suppressMessage) return;
        this.messageService.add({
          summary: 'Saved',
          detail: 'Answer Saved for ' + this.answerDetails[i].quesSeq,
          severity: 'success'
        });

      }
    })
  }


  manualSave() {
    if (this.selectedIndex < 0) {
      return;
    }
    this.saveSingleAnswer(this.selectedIndex);
  }

  onPaste($event: EventObj<ClipboardEvent>) {
    let a: string = $event.event.clipboardData.getData('text');
    if (a.includes('luckysheet_copy_action_table')) {
      $event.event.preventDefault();
      $event.editor.insertContent(a)
    }

  }

  onCloseExamOverDialog() {
    this.router.navigate(['']);
  }

  toggleSheet() {
    this.sheetVisible = !this.sheetVisible;
    setTimeout(() => {
      if (this.sheetVisible) {
        this.showLuckySheet();
      }
    }, 10)

  }


  removePinItem(questionDetail: ExamQuestionDetailModel) {
    this.pinnedItems.forEach((item, index) => {
      if (item === questionDetail) this.pinnedItems.splice(index, 1);
    });
  }

  showReviewDialog() {
    this.answerQueryData = new AnswerQueryModel();
    this.answerQueryData.quesId = this.examInfo.quesId;
    this.answerQueryData.enrolmentId = this.examInfo.enrollmentId;
    this.answerQueryData.studentUsername = this.examInfo.studentUsername;
    this.answerQueryData.answerDesc = "";
    this.answerQueryData.quesSeq = 0;

    this.reviewDialogVisible = true;
  }

  saveAll(action: SaveAction) {

    let answers = this.answerDetails;

    if (action == SaveAction.autoSave) {
      answers = Array.from(this.changedIndexSet).map(i => this.answerDetails[i]);
      console.log('saving... ' + answers.map(a => a.quesSeq));
      this.changedIndexSet.clear();
    }

    this.examPaperService.submitAnswer(answers).subscribe({
      next: apiResponse => {
        if (apiResponse.result) {
          for (let i = 0; i < apiResponse.data.length; i++) {
            let index = this.answerDetails.findIndex(a => a.quesSeq === apiResponse.data[i].quesSeq);
            this.answerDetails[index].id = apiResponse.data[i].id
          }

          if (action == SaveAction.saveAll) {
            this.messageService.add({summary: 'Success', detail: 'All Answers Saved', severity: 'success'})
          }

          if (action == SaveAction.submit) {
            this.messageService.add({summary: 'Success', detail: 'Answers submitted Successfully', severity: 'success'})
            this.router.navigate(['/'])
          }
          if (action == SaveAction.autoSave) {
            console.log('saved ' + apiResponse.data.map(a => a.quesSeq))
          }

        }

      },
      error: err => {

      }
    })


  }

  onAnswerChange(selectedIndex: number) {
    this.changedIndexSet.add(selectedIndex);
    let answers = Array.from(this.changedIndexSet).map(i => this.answerDetails[i]);
    console.log('changed ' + answers.map(a => a.quesSeq));
    this.triggerAutoSave()
  }

  triggerAutoSave() {

    if (this.autoSavetriggered) return;
    this.autoSavetriggered = true;

    let seconds = 10;
    console.log('saving in '+ seconds +' seconds...')
    setTimeout(() => {
      this.autoSavetriggered = false;

      this.saveAll(SaveAction.autoSave);

    }, seconds * 1000);

  }
}
