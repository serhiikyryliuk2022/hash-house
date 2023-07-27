import {ImageModel} from "./image.model";

export interface ItemsModel {
  name?: string,
  items?: [{
    image: ImageModel,
    title: string,
    description: string,
  }]
}
