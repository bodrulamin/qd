import {Component, inject, OnDestroy} from '@angular/core';
import {Subscriber} from "rxjs";
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-base-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnDestroy {
  subscribers: any = {}
  private msgService = inject(MessageService)

  constructor() {
  }

  ngOnDestroy(): void {
    for (let subscriberKey in this.subscribers) {
      let subscriber = this.subscribers[subscriberKey];
      if (subscriber instanceof Subscriber) {
        subscriber.unsubscribe();
      }
    }
  }

  protected markFormGroupAsTouched(group: FormGroup | FormArray) {
    group.markAsTouched();
    group.markAsDirty();
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsTouched();
        group.controls[i].markAsDirty();
      } else {
        this.markFormGroupAsTouched(group.controls[i]);
      }
    }
  }

  showRequiredErrorMessage(form: FormGroup, required_field: any) {
    let requiredErrorMessage = null;
    requiredErrorMessage = this.getRequiredMsg(form.controls, required_field, requiredErrorMessage);
    if (requiredErrorMessage) {
      this.msgService.add({summary: "Fill up mandatory field.", detail: requiredErrorMessage, severity: 'error'})
    }
    return requiredErrorMessage;
  }

  private getRequiredMsg(c: { [p: string]: AbstractControl }, required_field: any, requiredErrorMessage) {
    for (const key in c) {
      if (c[key].status === 'INVALID') {
        if (c[key].hasOwnProperty('controls')) {
          requiredErrorMessage = this.getRequiredMsg(c[key]['controls'], required_field, requiredErrorMessage);
        } else {
          if (required_field[key]) {
            if (requiredErrorMessage) {
              requiredErrorMessage += ', ' + '\n' + required_field[key];
            } else {
              requiredErrorMessage = required_field[key];
            }
          }

        }
      }
    }
    return requiredErrorMessage;
  }


}
