import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../../base/components/base-component/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent extends BaseComponent {
  examLevels = [];
  sessions = [];
  subjects = [];
  createQuestionForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.prepareCreateQuestionForm();
  }

  private prepareCreateQuestionForm() {
    this.createQuestionForm = this.formBuilder.group({
      examLevel: ['', Validators.required],
      session: ['', Validators.required],
      year: ['', [Validators.required]],
      subject: ['', Validators.required]
    });
  }


  searchQuestion() {
    this.markFormGroupAsTouched(this.createQuestionForm);
    // this.router.navigate(["../edit-question"], {relativeTo: this.activatedRoute})
  }


}
