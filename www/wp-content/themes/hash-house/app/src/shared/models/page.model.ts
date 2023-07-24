import {cFieldsModel} from "./cFields.model";

export interface PageModel {
  cFields: cFieldsModel,
  title: string;
  content: string;
}
