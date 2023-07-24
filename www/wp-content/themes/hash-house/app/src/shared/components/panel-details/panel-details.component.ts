import { Component, Input } from '@angular/core';
import {DescriptionCardModel, ItemDetailsModel, ItemsModel} from '@models';

@Component({
  selector: 'hashhouse-panel-details',
  templateUrl: './panel-details.component.html',
  styleUrls: ['./panel-details.component.scss']
})
export class PanelDetailsComponent {
  //@ts-ignore
  pathUri: string = window.myPostData;

  @Input() model!: ItemDetailsModel
  @Input() whyChoose!: DescriptionCardModel[]

}
