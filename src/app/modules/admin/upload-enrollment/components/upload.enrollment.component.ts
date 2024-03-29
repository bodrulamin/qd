import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UploadEnrollmentService} from "../service/upload.enrollment.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {StudentSearchModel, UploadEnrollmentModel} from "../service/domain/upload.enrollment.model";

@Component({
  selector: 'app-upload-enrollment',
  templateUrl: './upload.enrollment.component.html',
  styleUrls: ['./upload.enrollment.component.css']
})
export class UploadEnrollmentComponent extends BaseComponent {
  studentList: UploadEnrollmentModel[] = [];
  searchText: string = '';
  files: any;
  uploadStatusDialogVisible: boolean = false;
  uploadRemarks: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private confirmationService:ConfirmationService,
    private uploadEnrollmentService: UploadEnrollmentService,
  ) {
    super();
    this.searchEnrolledStudents();
  }


  searchEnrolledStudents() {
    let searchModel = new StudentSearchModel();
    searchModel.searchText = this.searchText;
    this.subscribers.searchStudentsSub = this.uploadEnrollmentService.searchEnrolledStudents(searchModel).subscribe(apiResponse => {
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

    this.subscribers.uploadCsvSubs = this.uploadEnrollmentService.uploadStudentEnrollment(formData).subscribe({
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

    this.subscribers.uploadCsvSubs = this.uploadEnrollmentService.uploadStudentEnrollment(formData).subscribe({
      next: apiResponse => {
        this.uploadRemarks = apiResponse.remarks;
        this.uploadStatusDialogVisible = true;
      }
    });
  }

  deleteEnrollment(e: any) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this enrollment? this can not be undone!',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.uploadEnrollmentService.deleteStudentEnrollment({id: e.id}).subscribe({
          next: apiResponse => {
            this.searchEnrolledStudents();
            this.messageService.add({severity: 'success', summary: 'Success', detail: apiResponse.remarks.join(", ")})
          }
        })
      },
      reject: (type) => {

      }
    });



  }
}
