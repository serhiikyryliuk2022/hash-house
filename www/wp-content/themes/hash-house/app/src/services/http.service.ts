import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {
  ContactFormModel,
  DownloadFormModel,
  FooterModel,
  PageModel,
  ProductModel,
  ResponseModel
} from "@models";
import {IIntroducingPage} from "../shared/models/introducing.module";

@Injectable()
export class HttpService {
    private url: string = 'http://gentlecode.com.ua:8080/';

  constructor(
    private http: HttpClient,
  ) {
    // this.url = window.location.origin;
  }

  sendContactForm(form: ContactFormModel) {
    const namespace = 'wp-json/app/v1';
    const url = `${this.url}/${namespace}/contact`;

    return this.http.post<ResponseModel>(url, form);
  }

  sendDownloadForm(slug: string, form: DownloadFormModel) {
    const namespace = 'wp-json/app/v1';
    const url = `${this.url}/${namespace}/download-form/${slug}`;

    return this.http.post<ResponseModel>(url, form);
  }

  getPageData(uri: string) {
    const namespace = 'wp-json/wp/v2';
    const url = `${this.url}/${namespace}/page/${uri}`;

    return this.http.get<PageModel>(url);
  }

  getFooter(uri: string) {
    const namespace = 'wp-json/wp/v2';
    const url = `${this.url}/${namespace}/${uri}`;

    return this.http.get<FooterModel>(url);
  }

  getProduct(slug: string) {
    const namespace = '/wp-json/wp/v2';
    const url = `${this.url}/${namespace}/product/${slug}`;

    return this.http.get<ProductModel>(url);
  }

  getImmersion() {
    const namespace = '/wp-json/wp/v2';
    const url = `${this.url}/${namespace}/page/immersion`;
    return this.http.get<IIntroducingPage>(url);
  }
}
