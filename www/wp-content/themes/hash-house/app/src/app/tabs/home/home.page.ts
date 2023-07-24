import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { combineWithHeader } from '@constants';
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
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly PAGE_NAME = 'Home';
  protected top : BannerModel = {};
  protected map : MapModel = {};
  protected whyChoose : ItemsModel = {};
  protected products : Array<ProductModel> = [];

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
    let self = this;

    this.httpService
      .getPageData('home')
      .subscribe( ({title, cFields}) => {
        self.title.setTitle(combineWithHeader(title || this.PAGE_NAME));
        self.initPage(cFields);
      });
  }

  initPage(cFields: cFieldsModel) {
    this.top = cFields.top;
    this.map = cFields.map;
    this.whyChoose = cFields.whyChoose;
    this.products = cFields.products;
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(data => {

      if (Object.keys(data).length === 0) return;

      const { anchor } = data;
      this.contactFormSection.nativeElement.scrollIntoView(anchor);
      this.router.navigate([], { queryParams: { 'anchor': null }, queryParamsHandling: 'merge', fragment: anchor })
    });

    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  navigateToContactForm() {
    this.contactFormSection.nativeElement.scrollIntoView('contact-form');
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  submitForm() {
    let self = this;
    if (this.contactForm.valid) {
      const model = this.convertFormToModel();
      this.httpService.sendContactForm(model)
        .subscribe(({message}) => {
          self.contactForm.reset()
          alert(message);
        });
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

  goToLink(slug: string){
    this.router.navigate([`/${slug}`]);
  }

  notImplemented() {
    alert("Not implemented yet");
  }

  ngOnDestroy(): void {
    this.navigateToTop();
  }
}
