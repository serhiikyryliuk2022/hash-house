import {ImageModel} from "./image.model";

export interface SocialModel {
  name: string,
  data:{
    image: ImageModel,
    link: string
  }
}
