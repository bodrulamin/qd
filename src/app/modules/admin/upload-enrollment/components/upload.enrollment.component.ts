import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {UploadEnrollmentService} from "../service/upload.enrollment.service";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {StudentSearchModel, UploadEnrollmentModel} from "../service/domain/upload.enrollment.model";
import {AdminService} from "../../service/admin.service";

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
}
