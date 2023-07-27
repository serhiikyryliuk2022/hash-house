import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { combineWithSiteName } from '@constants';
import {
  BannerModel,
  cFieldsModel,
  ContactFormModel,
  ItemsModel,
  MapModel,
  ProductModel
} from '@models';

import { EventService, HttpService } from '@services';

@Component({
  selector: 'hashhouse-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomeComponent implements OnInit {

  private readonly PAGE_NAME = 'Home';
  protected top: BannerModel = {};
  protected map: MapModel = {};
  protected whyChoose: ItemsModel = {};
  protected products: Array<ProductModel> = [];
  url: string = '';

  protected showFormValidation = false;

  @ViewChild("contactFormSection") contactFormSection!: ElementRef;

  contactForm: FormGroup;

  get isDisabledSubmit() {
    return !this.contactForm.valid;
  }

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: '',
      phone: ['', [Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)]],
      notes: '',
      products: this.formBuilder.group({
        pdu: true,
        psu: false,
        cables: false,
      }),
    });

    // Dynamic products set:
    // let products: { [key: string]: boolean } = {}; // products[product_name]: isChecked
    // products['pdu'] = false;
    // products['psu'] = false;
    // products['cables'] = true;
    // var productsForm = formBuilder.group(products)
    // this.contactForm.addControl('products', productsForm);
  }

  ngOnInit(): void {
    const { title, cFields, url } = this.route.snapshot.data['data'];
    this.url = url;

    this.initPage(cFields);

    this.title.setTitle(combineWithSiteName(title || this.PAGE_NAME));
    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  initPage(cFields: cFieldsModel) {
    this.top = cFields.top;
    this.map = cFields.map;
    this.whyChoose = cFields.whyChoose;
    this.products = cFields.products;
  }

  navigateToContactForm() {
    this.contactFormSection.nativeElement.scrollIntoView();
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  submitForm() {
    let self = this;
    if (this.contactForm.valid) {
      const model = this.convertFormToModel();
      this.httpService.sendContactForm(model)
        .subscribe(({ message }) => {
          self.contactForm.reset()
          alert(message);
        });
    }
    else {
      this.showFormValidation = true;
    }
  }

  convertFormToModel(): ContactFormModel {
    let products: Array<string> = Object
      .entries(this.contactForm.value.products)
      .filter(item => item[1] === true)
      .map(item => item[0]);

    let model: ContactFormModel;
    model = {
      name: this.contactForm.value.name,
      company: this.contactForm.value.company,
      mail: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      notes: this.contactForm.value.notes,
      products
    };

    return model;
  }

  isRequiredInput(name: string) {
    return this.contactForm.get(name)?.hasValidator(Validators.required);
  }

  isNotValidInput(name: string) {
    return this.contactForm.get(name)?.invalid;
  }

  goToLink(slug: string) {
    this.router.navigate([`/${slug}`]);
  }
}
