import {VariationsTableModel} from "./variations.table.model";
import {PanelSliderModel} from "./panel-slider.model";
import {DescriptionCardModel} from "./description-card.model";
import {ProductFieldsModel} from "./product.fields.model";

export interface ProductModel {
  description?: string,
  gallery?: PanelSliderModel[],
  image?: {
    src: string,
    alt: string,
  },
  name?: string,
  short_description?: string
  slug?: string
  variations?: VariationsTableModel
  whyChoose?: DescriptionCardModel[]
  url?: string
  cpFields?: ProductFieldsModel
}
