import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineWithSiteName } from '@constants';
import { EventService } from '@services';

@Component({
  selector: 'hashhouse-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss']
})
export class OthersComponent implements OnInit {
  private readonly PAGE_NAME = 'Others';

  constructor(
    private title: Title,
    private viewportScroller: ViewportScroller,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle(combineWithSiteName(this.PAGE_NAME));
    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
