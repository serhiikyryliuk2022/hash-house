import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { combineWithHeader } from '@constants';
import { EventService, HttpService } from '@services';
import {IIntroducingCFieldsPage, IIntroducingPage} from "../../../shared/models/introducing.module";

@Component({
  selector: 'hashhouse-immersion',
  templateUrl: './immersion.page.html',
  styleUrls: ['./immersion.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImmersionPage implements OnInit, OnDestroy {
  private readonly PAGE_NAME = 'Instruction';
  //@ts-ignore
  pathUri: string = window.myPostData;
  url: string = '';
  //protected top : BannerModel = {};
 // protected banner_2 : BannerModel = {};
  //protected description: string | undefined = '';
  //protected team: TeamModel = { blockName: '', items:[{}] };

  protected block_1: { [key: string]: string } = {};
  protected block_2: { [key: string]: string } = {};
  protected block_3: { [key: string]: string } = {};
  protected product_overview: { [key: string]: string } = {};
  protected specification_sheet: { [key: string]: string } = {};

  constructor(
    private title: Title,
    private viewportScroller: ViewportScroller,
    private eventService: EventService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    let self = this;

    this.httpService
      .getImmersion()
      .subscribe( (res: IIntroducingPage) => {
        if(res.cFields){
          self.initPage(res.cFields);
        }
      });
  }

  initPage(cFields: IIntroducingCFieldsPage) {
    this.block_1 = cFields.block_1 || null;
    this.block_2 = cFields.block_2 || null;
    this.block_3 = cFields.block_3 || null;
    this.specification_sheet = cFields.specification_sheet || null;
    this.product_overview = cFields.product_overview || null;
    this.url = cFields.url || '';
  }

  navigateToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.eventService.scrollToTop$.subscribe(() => this.navigateToTop());
  }

  ngOnDestroy(): void {
    this.navigateToTop();
  }
}
