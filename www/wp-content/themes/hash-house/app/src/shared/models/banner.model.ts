import {ImageModel} from "./image.model";

export interface BannerModel {
  description?: string,
  text?: string,
  image?: ImageModel;
  show?: boolean;
  name?: string;
}
