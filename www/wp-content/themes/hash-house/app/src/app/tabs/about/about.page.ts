import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineWithHeader } from '@constants';
import { EventService, HttpService } from '@services';
import { BannerModel, cFieldsModel, TeamModel } from "@models";

@Component({
  selector: 'hashhouse-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly PAGE_NAME = 'About';
  protected top : BannerModel = {};
  protected banner_2 : BannerModel = {};
  protected description: string | undefined = '';
  protected team: TeamModel = { blockName: '', items:[{}] };

  constructor(
    private title: Title,
    private viewportScroller: ViewportScroller,
    private eventService: EventService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    let self = this;

    this.httpService
      .getPageData('about-us')
      .subscribe( ({title, cFields}) => {
          self.title.setTitle(combineWithHeader(title || this.PAGE_NAME));
          self.initPage(cFields);
      });
  }

  initPage(cFields: cFieldsModel) {
    this.top = cFields.top;
    this.banner_2 = cFields.block3;
    this.description = cFields.description;
    this.team = cFields.team;
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  ngOnDestroy(): void {
    this.navigateToTop();
  }
}
