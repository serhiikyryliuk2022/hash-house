import { Component } from '@angular/core';
import { EventService } from '@services';

@Component({
  selector: 'hashhouse-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  //@ts-ignore
  pathUri: string = window.myPostData

  constructor(
    private eventService: EventService,
  ) {}

  async goToTop() {
    this.eventService.scrollToTop();
  }
}
