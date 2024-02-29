import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-qthumbnail',
  templateUrl: './qthumbnail.component.html',
  styleUrls: ['./qthumbnail.component.css']
})
export class QthumbnailComponent {
  @Input() item: string = '1';
}
