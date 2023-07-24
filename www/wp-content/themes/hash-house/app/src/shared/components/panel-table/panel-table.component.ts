import { Component, EventEmitter, Input, Output } from '@angular/core';
import {VariationsTableModel} from '@models';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'hashhouse-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.scss']
})
export class PanelTableComponent {
  //@ts-ignore
  pathUri: string = window.myPostData;

  constructor(
    private http: HttpClient
  ) {}

  @Input() table: VariationsTableModel = {};

  @Output() onBroshureClick = new EventEmitter<string>();
  @Output() onContactUsClick = new EventEmitter<string>();
  @Output() onLoadMoreClick = new EventEmitter();

  broshureClick(i: number) {
    if(this?.table && this.table.files){
      return this!.table!.files[i] ?? '';
    }

    return '/';
  }

  contactUsClick(id: string) {
    this.onContactUsClick.emit(id);
  }

  loadMoreClick() {
    this.onLoadMoreClick.emit();

    this.notImplemented();
  }

  sortClick() {
    this.notImplemented();
  }

  private notImplemented() {
    alert("Not implemented yet");
  }
}
