import {Component, ElementRef, ViewChild} from '@angular/core';
import {Editor, EditorTextChangeEvent} from "primeng/editor";
import {ConfirmationService, MessageService} from "primeng/api";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteQuestionModel, QuestionDetailModel, QuestionInfo, QuestionModel} from "../service/domain/question.model";
import {EditQuestionService} from "../service/edit-question.service";
import {CreateQuestionService} from "../../create-question/service/create-question.service";
import {FileSelectEvent, FileUpload, FileUploadErrorEvent, FileUploadEvent} from "primeng/fileupload";
import html2canvas from 'html2canvas';
import generatePdfThumbnails from 'pdf-thumbnails-generator';
import {AdminService} from "../../../service/admin.service";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
  providers: []
})
export class EditQuestionComponent extends BaseComponent {
  questionDetail: QuestionDetailModel = new QuestionDetailModel();
  questionMaster: QuestionModel = new QuestionModel();
  questionInfo: QuestionInfo = new QuestionInfo();
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
  pdfBlobMap = new Map();
  thumbnailBlobMap = new Map();
  firstTimeCall: boolean = true;
  saveStatus: string;
  subjectMap: Map<any, any> = new Map();
  examLevelMap: Map<any, any> = new Map();
  questionDetailsDialogVisible: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private editQuestionService: EditQuestionService,
    private createQuestionService: CreateQuestionService,
    private adminService: AdminService,
    public layoutService: LayoutService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.fetchConfiguration();
    this.layoutService.hideSideMenu();

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      let fullDelete = params['fullDelete'];
      if (fullDelete === 'true') {
        let deleteModel = new DeleteQuestionModel();
        deleteModel.isFullQuesDelete = true;
        deleteModel.quesId = this.id;
        this.subscribers.deleteQuestionsubs = this.editQuestionService.deleteQuetion(deleteModel).subscribe(apiResponse => {
          if (apiResponse.result) {
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Question Deleted'});
            return;
          }
        });
      }

      if (this.id) {
        this.fetchExistingQuestion(this.id);
      } else {
        if (history.state.data) {
          this.questionMaster = history.state.data;
          this.questionInfo = history.state.data;
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

        if (!deleteModel.quesId) return;

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
    if (this.thumbnailBlobMap.get(this.questionDetails[i].id)) {
      this.thumbnailBlobMap.delete(this.questionDetails[i].id);
    }
    if (this.pdfBlobMap.get(this.questionDetails[i].id)) {
      this.pdfBlobMap.delete(this.questionDetails[i].id);
    }

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
    }
  }

  generateFileBlobsFromApi(i: number, fileUrl: string) {
    let urlParam = new Map();
    urlParam.set('filePath', fileUrl)
    this.subscribers.fetchFileSubs = this.editQuestionService.fetchByFileUrl(urlParam).subscribe(data => {
      var file = new Blob([data], {type: 'application/pdf'});
      let blobUrl = URL.createObjectURL(file);
      this.pdfBlobMap.set(this.questionDetails[i].id, blobUrl)
      this.generatePdfThumbnails(i)
    })
  }

  validateAndSave() {
    this.messageService.clear();

    if (!this.validated()) return;

    if (!this.questionMaster.id && this.firstTimeCall) {
      this.firstTimeCall = false;
      this.saveQuestion(this.questionMaster, this.selectedIndex);
    }
    if (this.selectedIndex < 0) return;
    if (!this.autoSave) return;
    this.saveQuestion(this.questionMaster, this.selectedIndex);
  }

  validated() {
    if (this.selectedIndex < 0) {
      let summery = ''
      let detail = ''
      if (!this.questionDetails.length) {
        summery = 'Add Question'
        detail = 'Please add a question'
      } else {
        summery = 'Select Question'
        detail = 'Please select a question from left pane'
      }
      this.messageService.add({summary: summery, detail: detail, severity: 'warn'})
      return false;
    }
    if (this.hasDuplicate(this.questionDetails, 'seqNo')) {
      this.messageService.add({summary: 'Error', detail: 'Duplicate sequnce found !', severity: 'error'})
      return false;
    }
    if (this.questionDetail.marks <= 0) {
      this.messageService.add({summary: 'Error', detail: 'Input valid marks!', severity: 'error'})
      return false;
    }
    return true;
  }

  saveQuestion(master: QuestionModel, i: number, file?: File, showSavedStatus?: boolean) {
    let formData = new FormData();

    master.quesDetail = this.questionDetails[i];
    if (file) {
      master.quesDetail.isFile = true;
      master.quesDetail.quesDesc = '';
      formData.append('file', file);
    }

    let data = JSON.stringify(master);
    formData.append('data', data);

    this.saveStatus = this.questionDetails[i].seqNo + ' - Saving ...'
    this.subscribers.editQsubs = this.editQuestionService.addQuestion(formData).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.messageService.add({
          summary: 'Saved',
          detail: 'Sequence ' + master.quesDetail.seqNo + ' saved',
          severity: 'success'
        })
        this.saveStatus = 'saved'
        let data = apiResponse.data;
        this.setupSavedData(data, i);
        this.autoSave = true;
        this.firstTimeCall = false
      }
    }, error => {
      if (!this.questionMaster.id) {
        this.firstTimeCall = true;
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

  private async setupExistingQuestion(data) {
    this.questionInfo = data;
    this.questionMaster.id = data.id;
    this.questionMaster.examLevel = data.examLevel
    this.questionMaster.session = data.session
    this.questionMaster.year = data.year
    this.questionMaster.subjectCode = data.subjectCode

    for (let i = 0; i < data.quesDetailsList.length; i++) {
      this.questionDetails[i] = data.quesDetailsList[i];
      if (this.questionDetails[i].isFile) {
        this.generateFileBlobsFromApi(i, this.questionDetails[i].fileUrl);
      } else {
        await this.generateHtmlThumbnails(i);
        this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = ''
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
      this.generateFileBlobsFromApi(i, this.questionDetails[i].fileUrl);
    } else {
      this.generateHtmlThumbnails(i);
    }
  }

  async generateHtmlThumbnails(i: number) {
    let element = this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0];
    this.editor.el.nativeElement.getElementsByClassName('ql-editor')[0].innerHTML = this.questionDetails[i].quesDesc
    // let element = document.getElementById('preview')
    // element.innerHTML = this.questionDetails[i].quesDesc;
    if (!this.questionDetails[i].quesDesc) return;
    html2canvas(element).then(canvas => {
      let blobUrl = canvas.toDataURL('image/png');
      this.thumbnailBlobMap.set(this.questionDetails[i].id, blobUrl)

    });

  }

  async generatePdfThumbnails(i: number) {
    try {
      const thumbnails = await generatePdfThumbnails(this.pdfBlobMap.get(this.questionDetails[i].id), 500);
      this.thumbnailBlobMap.set(this.questionDetails[i].id, thumbnails[0].thumbnail)
    } catch (err) {
      console.error(err);
    }

  }

  onFileSelect(event: FileSelectEvent) {
    if (this.selectedIndex < 0) {
      this.messageService.add({
        summary: 'Question not selected',
        detail: 'Please select a question to attach file',
        severity: 'error'
      });
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

  hasDuplicate(arr: any[], field: string): boolean {
    return arr.some((obj, index) => arr.findIndex(innerObj => innerObj[field] === obj[field]) !== index);
  }

  onBlurSequence($event: FocusEvent) {
    this.validateAndSave();
  }

  onBlurMarks($event: FocusEvent) {
    this.validateAndSave();
  }

  fileError($event: FileUploadErrorEvent) {
  }

  message() {

  }

  private fetchConfiguration() {
    this.subscribers.confSubs = this.adminService.fetchConfiguration().subscribe(apiResponse => {
      if (apiResponse.result) {
        apiResponse.data.examLevelList.forEach(e => {
          this.examLevelMap.set(e.code,e.name);
        });
      }
    })
  }
}
