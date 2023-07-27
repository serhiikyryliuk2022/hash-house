import {SocialModel} from "./social.model";
import {LinksModel} from "./links.model";

export interface FooterModel {
  social: Array<SocialModel>,
  productsLinks: Array<LinksModel>,
  servicesLinks: Array<LinksModel>,
  url: string,
}
