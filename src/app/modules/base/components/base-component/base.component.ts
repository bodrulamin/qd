import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscriber} from "rxjs";

@Component({
  selector: 'app-base-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnDestroy{
  subscribers:any = {}
  ngOnDestroy(): void {
    for (let subscriberKey in this.subscribers) {
      let subscriber = this.subscribers[subscriberKey];
      if (subscriber instanceof Subscriber) {
        subscriber.unsubscribe();
      }
    }
  }

}
