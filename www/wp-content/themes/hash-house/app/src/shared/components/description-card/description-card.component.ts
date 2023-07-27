import { Component, Input } from '@angular/core';
import { DescriptionCardModel } from '@models';

@Component({
  selector: 'hashhouse-description-card',
  templateUrl: './description-card.component.html',
  styleUrls: ['./description-card.component.scss']
})
export class DescriptionCardComponent {
  @Input() model!: DescriptionCardModel

}
