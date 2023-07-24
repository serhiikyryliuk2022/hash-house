import {ImageModel} from "./image.model";

export interface MapModel {
  name?: string,
  items?: [ImageModel],
  background?: ImageModel,
}
