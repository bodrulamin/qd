import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";
import generatePdfThumbnails from 'pdf-thumbnails-generator';
import {ExamPaperService} from "../service/exam-paper.service";
import {AnswerModel, ExamInfo, ExamQuestionDetailModel, ExamQuestionModel} from "../service/domain/exam-question.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdminService} from "../../../admin/service/admin.service";
import html2canvas from "html2canvas";
import {EventObj} from "@tinymce/tinymce-angular/editor/Events";

declare var luckysheet;

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.css']
})
export class ExamPaperComponent extends BaseComponent implements OnInit, AfterViewInit {

  examInfo: ExamInfo = new ExamInfo();
  answer: AnswerModel = new AnswerModel();
  thumbnailBlobMap = new Map();
  pdfBlobMap = new Map();
  questionDetails: ExamQuestionDetailModel[] = [];
  answerDetails: AnswerModel[] = [];
  questionMaster: ExamQuestionModel = new ExamQuestionModel();

  // @ViewChild("editor", {static: true}) editor!: Editor;
  @ViewChild("pdfView") pdfView!: ElementRef;

  selectedIndex: number = -1;
  autoSave: boolean;
  questionDetail: ExamQuestionDetailModel = new ExamQuestionDetailModel();
  questionSelected: boolean = false;

  examLevelMap: Map<any, any> = new Map();
  remainingTime: any;

  calulatorVisible: boolean = false;
  scientificMode = false;
  showResources: boolean = true;
  pinnedItems: ExamQuestionDetailModel[] = [];
  examOver: boolean = false;
  sheetVisible: boolean = true;

  constructor(
    private examPaperService: ExamPaperService,
    private router: Router,
    private messageService: MessageService,
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

    this.setupExistingQuestion(data);

    this.questionDetails = data.quesDetailsList;

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
    this.answerDetails[this.selectedIndex] = this.answer;
    this.questionSelected = true;
    this.selectedIndex = i;
    this.questionDetail = this.questionDetails[i];
    this.answer = this.answerDetails[i] || new AnswerModel();
    setTimeout(() => {
      // this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.answer.answerDesc || ''
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

    for (let i = 0; i < data.answerVmList.length; i++) {
      this.answerDetails[i] = data.answerVmList[i];
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
    let element = document.getElementById('html-preview');
    element.innerHTML = this.questionDetails[i].quesDesc;
    if (!this.questionDetails[i].quesDesc) return;
    html2canvas(element).then(canvas => {
      let blobUrl = canvas.toDataURL('image/png');
      this.thumbnailBlobMap.set(this.questionDetails[i].id, blobUrl)
      element.innerHTML = '';
    });

  }

  autoSaveAnser() {
    // this.saveAnser(this.questionMaster, this.selectedIndex);
  }

  private saveAnser(questionMaster: ExamQuestionModel, i: number) {


    let answerModel: AnswerModel = new AnswerModel();
    answerModel.quesId = questionMaster.id;
    answerModel.answerDesc = this.answerDetails[i].answerDesc
    answerModel.studentUsername = this.examInfo.studentUsername;
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
    console.log(this.answer)
    if (this.selectedIndex < 0) {
      return;
    }
    this.answer.quesSeq = this.questionDetails[this.selectedIndex].seqNo;
    this.answerDetails[this.selectedIndex] = this.answer;
    this.saveAnser(this.questionMaster, this.selectedIndex);
  }

  pinMe() {

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
    setTimeout(()=>{
      if (this.sheetVisible) {
        this.showLuckySheet();
      }
    },10)

  }


  removePinItem(questionDetail: ExamQuestionDetailModel){
    this.pinnedItems.forEach( (item, index) => {
      if(item === questionDetail) this.pinnedItems.splice(index,1);
    });
  }
}
