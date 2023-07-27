import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ProductFieldsModel, VariationsTableModel } from '@models';

@Component({
  selector: 'hashhouse-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.scss']
})
export class PanelTableComponent {
  @ViewChild("tableTitle") tableTitle!: ElementRef;

  @Input() cFields: ProductFieldsModel = {};
  @Input() url: string = '';
  @Input() tableData: VariationsTableModel = {};

  @Output() onBrochureClick = new EventEmitter<string>();
  @Output() onContactUsClick = new EventEmitter<string>();
  @Output() onLoadMoreClick = new EventEmitter();

  navigateToTable() {
    this.tableTitle.nativeElement.scrollIntoView();
  }

  brochureClick(i: number) {
    if (this.tableData && this.tableData.files) {
      return this.tableData.files[i] ?? '';
    }

    return '/';
  }

  contactUsClick(id: string) {
    this.onContactUsClick.emit(id);
  }

  loadMoreClick() {
    this.onLoadMoreClick.emit();
  }

  sortClick() { }
}
