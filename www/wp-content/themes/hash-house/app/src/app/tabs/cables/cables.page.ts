import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineWithHeader } from '@constants';
import {
  DescriptionCardModel,
  ItemDetailsModel, PanelSliderModel,
  ProductModel,
  VariationsTableModel
} from '@models'
import { EventService, HttpService } from '@services';
import { Router } from "@angular/router";

@Component({
  selector: 'hashhouse-cables',
  templateUrl: './cables.page.html',
  styleUrls: ['./cables.page.scss']
})
export class CablesComponent implements OnInit, OnDestroy {
  private readonly PAGE_NAME = 'Cables';

  sliderModel: PanelSliderModel[] = [];
  productModel: ProductModel = {};
  whyChoose: DescriptionCardModel[] = [];
  tableModel: VariationsTableModel = {};

  detailsModel: ItemDetailsModel = {
    title: 'The anatomy of a Cables',
    description: 'Cables play a critical role in managing power distribution in data centers and other IT environments.',
    image: 'cables/anatomy.png',
  }

  constructor(
    private title: Title,
    private viewportScroller: ViewportScroller,
    private eventService: EventService,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let self = this;
    let slug = this.router.url.replace(/^\//, '');
    this.httpService
      .getProduct(slug)
      .subscribe(data => {
          self.initPage(data);
      });

    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  initPage(data: ProductModel) {
    this.title.setTitle(combineWithHeader(data.name || this.PAGE_NAME));

    this.productModel = {
      description: data.description,
      image: data.image,
      name: data.name,
      short_description: data.short_description,
    };
    this.whyChoose = data.whyChoose || [];

    this.tableModel = data.variations || {};
    this.sliderModel = data.gallery || [];
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  downloadFile(id: any) {
    alert('Click on item with id: ' + id);
  }

  ngOnDestroy(): void {
    this.navigateToTop();
  }
}
