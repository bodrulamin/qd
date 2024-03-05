import {Component, OnDestroy} from '@angular/core';
import {Subscriber} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-base-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnDestroy {
  subscribers: any = {}

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


}
