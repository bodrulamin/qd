import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UploadStudentService} from "../service/upload.student.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {StudentSearchModel} from "../service/domain/upload.student.model";

@Component({
  selector: 'app-upload-student',
  templateUrl: './upload.student.component.html',
  styleUrls: ['./upload.student.component.css']
})
export class UploadStudentComponent extends BaseComponent {
  studentList: any[] = [];
  searchText: string = '';
  files: any;
  uploadStatusDialogVisible: boolean = false;
  uploadRemarks: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private uploadStudentService: UploadStudentService,
  ) {
    super();
    this.searchStudents();
  }


  searchStudents() {
    let searchModel = new StudentSearchModel();
    searchModel.searchText = this.searchText;
    this.subscribers.searchStudentsSub = this.uploadStudentService.searchStudents(searchModel).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.studentList = apiResponse.data.dataList
      }
    });

  }


  uploadCsv(event: any) {
    const file: File = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('format', 'CSV');

    this.subscribers.uploadCsvSubs = this.uploadStudentService.uploadStudent(formData).subscribe({
      next: apiResponse => {
        this.uploadRemarks = apiResponse.remarks;
        this.uploadStatusDialogVisible = true;

      }
    });
  }

  uploadExcel(event: any) {
    const file: File = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('format', 'EXCEL');

    this.subscribers.uploadCsvSubs = this.uploadStudentService.uploadStudent(formData).subscribe({
      next: apiResponse => {
        this.uploadRemarks = apiResponse.remarks;
        this.uploadStatusDialogVisible = true;
      }
    });
  }


  deleteStudent(e: any) {
    this.uploadStudentService.deleteStudent({id: e.id}).subscribe({
      next: apiResponse => {
        this.searchStudents();
        this.messageService.add({severity: 'success', summary: 'Success', detail: apiResponse.remarks.join(", ")})
      }
    })

  }
}
