import {BannerModel} from "./banner.model";
import {TeamModel} from "./team.model";
import {MapModel} from "./map.model";
import {ItemsModel} from "./items.model";
import {ProductModel} from "./product.model";

export interface cFieldsModel {
  top: BannerModel,
  map: MapModel,
  team: TeamModel,
  description?: string,
  block3: BannerModel
  whyChoose: ItemsModel
  products: Array<ProductModel>
}
