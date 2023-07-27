import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineWithSiteName } from '@constants';
import {
  DescriptionCardModel,
  ItemDetailsModel, PanelSliderModel,
  ProductModel,
  VariationsTableModel,
  ProductFieldsModel
} from '@models'
import { EventService } from '@services';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'hashhouse-psu',
  templateUrl: './psu.page.html',
  styleUrls: ['./psu.page.scss']
})
export class PsuComponent implements OnInit {
  private readonly PAGE_NAME = 'PSU';

  sliderModel: PanelSliderModel[] = [];
  productModel: ProductModel = {};
  whyChoose: DescriptionCardModel[] = [];
  tableModel: VariationsTableModel = {};
  cFields: ProductFieldsModel = {};
  url: string = '';

  detailsModel: ItemDetailsModel = {
    title: 'The anatomy of a PSU',
    description: 'PSUs play a critical role in managing power distribution in data centers and other IT environments.',
    image: '/assets/img/psu/anatomy.png',
  }

  constructor(
    private title: Title,
    private viewportScroller: ViewportScroller,
    private eventService: EventService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data['data'];

    this.initPage(data);

    this.title.setTitle(combineWithSiteName(data.name || this.PAGE_NAME));
    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  initPage(data: ProductModel) {
    this.productModel = {
      description: data.description,
      image: data.image,
      name: data.name,
      short_description: data.short_description,
    };
    this.whyChoose = data.whyChoose || [];

    this.tableModel = data.variations || {};
    this.sliderModel = data.gallery || [];
    this.url = data.url || '';
    this.cFields = data.cpFields || {};

    this.detailsModel.image = this.url + '/'+ this.detailsModel.image;
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  downloadFile(id: any) {
    alert('Click on item with id: ' + id);
  }
}
