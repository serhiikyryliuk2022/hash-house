import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineWithSiteName } from '@constants';
import { EventService } from '@services';
import { BannerModel, cFieldsModel, TeamModel } from "@models";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hashhouse-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutComponent implements OnInit {
  private readonly PAGE_NAME = 'About';
  protected top: BannerModel = {};
  protected banner_2: BannerModel = {};
  protected description: string | undefined = '';
  protected team: TeamModel = { blockName: '', items: [{}] };

  constructor(
    private title: Title,
    private viewportScroller: ViewportScroller,
    private eventService: EventService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const { title, cFields } = this.route.snapshot.data['data'];

    this.initPage(cFields);

    this.title.setTitle(combineWithSiteName(title || this.PAGE_NAME));
    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  initPage(cFields: cFieldsModel) {
    this.top = cFields.top;
    this.banner_2 = cFields.block3;
    this.description = cFields.description;
    this.team = cFields.team;
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
