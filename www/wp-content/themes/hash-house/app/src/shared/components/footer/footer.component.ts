import { Component, Input } from '@angular/core';
import { FooterModel } from '@models';
import { EventService } from '@services';

@Component({
  selector: 'hashhouse-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() model!: FooterModel;

  constructor(
    private eventService: EventService,
  ) { }

  async goToTop() {
    this.eventService.scrollToTop();
  }
}
