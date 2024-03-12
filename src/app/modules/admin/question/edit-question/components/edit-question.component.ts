import {Component, ElementRef, ViewChild} from '@angular/core';
import {Editor, EditorTextChangeEvent} from "primeng/editor";
import {ConfirmationService, MessageService} from "primeng/api";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteQuestionModel, QuestionDetailModel, QuestionModel} from "../service/domain/question.model";
import {EditQuestionService} from "../service/edit-question.service";
import {CreateQuestionService} from "../../create-question/service/create-question.service";
import {FileSelectEvent, FileUpload, FileUploadEvent} from "primeng/fileupload";
import html2canvas from 'html2canvas';
import generatePdfThumbnails from 'pdf-thumbnails-generator';

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
  selectedIndex: number = -1;
  @ViewChild("editor") editor!: Editor;
  @ViewChild("fileUpload") fileUpload!: FileUpload;
  @ViewChild("pdfView") pdfView!: ElementRef;
  questionSelected = false;
  private id: any;
  inputMark: any;
  autoSave: boolean = false;
  newQuestionDialogVisible: boolean = false;
  fileBlobUrls = [];
  thumbainsBlobUrls = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private editQuestionService: EditQuestionService,
    private createQuestionService: CreateQuestionService,
    public layoutService: LayoutService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) {
    super();
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.fetchExistingQuestion(this.id);
      } else {
        if (history.state.data) {
          this.questionMaster = history.state.data;
          this.subscribers.searchQuesSubs = this.createQuestionService.searchQuestion(this.questionMaster).subscribe(apiResponse => {
            if (apiResponse.result) {
              let data = apiResponse.data;
              if (!data.isNew) {
                this.router.navigate(["../edit-question"], {
                  queryParams: {id: apiResponse.data.existingQues.id},
                  relativeTo: this.activatedRoute
                })
              }
            }
          });
        }
      }
    });
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
        let deleteModel = new DeleteQuestionModel();
        deleteModel.isFullQuesDelete = false;
        deleteModel.quesDetailsId = this.questionDetails[i].id;
        deleteModel.quesId = this.questionMaster.id;
        if (!deleteModel.quesDetailsId) {
          this.removeItemFromList(i);
        }
        this.subscribers.deleteQuestionsubs = this.editQuestionService.deleteQuetion(deleteModel).subscribe(apiResponse => {
          if (apiResponse.result) {
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Question Deleted'});
            this.removeItemFromList(i);
            return;
          }
        });
      },
      reject: (type) => {

      }
    });
  }

  private removeItemFromList(i: number) {
    this.selectedIndex = -1;
    this.questionSelected = false;
    this.questionDetail = new QuestionDetailModel();
    this.questionDetails.splice(i, 1);
  }

  selectQuestion(i: number) {
    this.questionSelected = true;
    this.selectedIndex = i;
    this.questionDetail = this.questionDetails[i];
    if (!this.questionDetail.isFile) {
      setTimeout(() => {
        this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.questionDetails[i].quesDesc
      }, 1)
    } else {
      if (this.fileBlobUrls[i]) {
        this.pdfView.nativeElement.src = this.fileBlobUrls[i];
        return;
      }
    }
  }

  generateFileBlobsFromApi(i: number, fileUrl: string, viewNow?: boolean) {
    let urlParam = new Map();
    urlParam.set('filePath', fileUrl)
    this.editQuestionService.fetchByFileUrl(urlParam).subscribe(data => {
      var file = new Blob([data], {type: 'application/pdf'});
      this.fileBlobUrls[i] = URL.createObjectURL(file);
      this.generatePdfThumbnails(i)
      if (viewNow) {
        this.pdfView.nativeElement.src = this.fileBlobUrls[i];
      }
    })
  }

  autoSaveQuestion() {

    if (!this.questionMaster.id) {
      this.saveQuestion(this.questionMaster, this.selectedIndex)
    }
    if (this.selectedIndex < 0) return;
    if (!this.autoSave) return;
    this.saveQuestion(this.questionMaster, this.selectedIndex)
  }

  saveQuestion(master: QuestionModel, i: number, file?: File) {
    let formData = new FormData();

    master.quesDetail = this.questionDetails[i];
    if (file) {
      master.quesDetail.isFile = true;
      formData.append('file', file);
    }

    let data = JSON.stringify(master);
    formData.append('data', data);
    this.autoSave = false;

    this.subscribers.editQuesSubs = this.editQuestionService.addQuestion(formData).subscribe(apiResponse => {
      if (apiResponse.result) {
        let data = apiResponse.data;
        this.setupSavedData(data, i);
      }
    });
  }

  showAddQuestionDialog() {
    this.inputMark = 0;
    this.newQuestionDialogVisible = true;
  }

  addNewQuestion() {
    this.newQuestionDialogVisible = true;
    if (!this.inputMark) {
      return;
    }
    this.questionDetail = new QuestionDetailModel();
    this.questionDetail.quesDesc = '<p></p>';
    this.questionDetail.marks = this.inputMark;
    this.questionDetail.seqNo = this.questionDetails.length + 1;
    delete this.questionDetail.id;
    this.questionDetails.push(this.questionDetail);
    this.selectedIndex = this.questionDetails.length - 1;
    this.newQuestionDialogVisible = false;
    this.selectQuestion(this.selectedIndex);

  }

  private fetchExistingQuestion(id: any) {
    let urlSearchParam = new Map();
    urlSearchParam.set('questionId', id)
    this.subscribers.fetchExistingQuestionSubs = this.editQuestionService.fetchExistingQuestion(urlSearchParam).subscribe(apiResponse => {
      if (apiResponse.result) {
        let data = apiResponse.data
        this.setupExistingQuestion(data);

      }
    })
  }

  private setupExistingQuestion(data) {
    this.questionMaster.id = data.id;
    for (let i = 0; i < data.quesDetailsList.length; i++) {
      this.questionDetails[i] = data.quesDetailsList[i];
      if (this.questionDetails[i].isFile) {
        this.generateFileBlobsFromApi(i, this.questionDetails[i].fileUrl);
      } else {
        this.generateHtmlThumbnails(i);
      }
    }
    this.autoSave = true;
  }

  private setupSavedData(data, i: number) {
    this.questionMaster.id = data.id;
    this.questionDetails[i].id = data.quesDetailsList[0].id;
    this.questionDetails[i].isFile = data.quesDetailsList[0].isFile;
    this.questionDetails[i].filePath = data.quesDetailsList[0].filePath;
    this.questionDetails[i].fileUrl = data.quesDetailsList[0].fileUrl;
    if (this.questionDetails[i].isFile) {
      this.generateFileBlobsFromApi(i, this.questionDetails[i].fileUrl, true);
    } else {
      this.generateHtmlThumbnails(i);
    }
    this.autoSave = true;
  }

  generateHtmlThumbnails(i: number) {
    let element = document.getElementById('preview')
    element.innerHTML = this.questionDetails[i].quesDesc;
    if (!this.questionDetails[i].quesDesc) return;
    html2canvas(element).then(canvas => {
      this.thumbainsBlobUrls[i] = canvas.toDataURL('image/png');
      element.innerHTML = '';
    });
  }
  async generatePdfThumbnails(i: number) {
    try {
      const thumbnails = await generatePdfThumbnails(this.fileBlobUrls[i], 500);
      // Use the generated thumbnail data (e.g., display it in an image tag)
      this.thumbainsBlobUrls[i] = thumbnails[0].thumbnail;
    } catch (err) {
      console.error(err);
    }

  }

  onFileSelect(event: FileSelectEvent) {
    if (this.selectedIndex < 0){
      this.messageService.add({summary:'Question not selected',detail:'Please select a question to attach file',severity:'error'});
      this.fileUpload.clear();
      return;
    }
    let file = event.files[0];
    this.saveQuestion(this.questionMaster, this.selectedIndex, file);
    this.fileUpload.clear();
  }

  onUpload($event: FileUploadEvent) {
    console.log($event)
  }
}
