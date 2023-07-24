import {PanelTableModel} from "./panel-table.model";

export interface VariationsTableModel {
  files?: Array<string>,
  header?: [],
  rows?: PanelTableModel[],
}
