import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../base/components/base-component/base.component";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UserModel} from "./service/domain/usre.lookup.model";
import {UserLookupService} from "./service/user.lookup.service";

@Component({
  selector: 'app-user-lookup',
  templateUrl: './user-lookup.component.html',
  styleUrls: ['./user-lookup.component.css']
})
export class UserLookupComponent extends BaseComponent implements OnInit {
  @Output('onSelect') onSelect = new EventEmitter<UserModel>()

  userSearchForm: FormGroup;
  required_field = {
    searchText: 'Search Text',
  };

  userList: UserModel[] = [];
  selectedUser: UserModel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private userLookupService: UserLookupService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.prepareCreateQuestionForm();
  }

  ngOnInit() {

  }

  private prepareCreateQuestionForm() {
    this.userSearchForm = this.formBuilder.group({
      searchText: [null, Validators.required],
    });
  }


  searchUser() {
    if (this.formInvalid()) return;
    this.subscribers.lockQuestionSubs = this.userLookupService.searchUsers(this.userSearchForm.value, new Map()).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.userList = apiResponse.data.dataList
      }
    });


  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.userSearchForm)
    this.showRequiredErrorMessage(this.userSearchForm, this.required_field)
    return this.userSearchForm.invalid;
  }


  onSelectUser() {
    this.onSelect.emit(this.selectedUser)
  }
}
