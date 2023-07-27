import { Component, OnInit } from '@angular/core';
import { FooterModel, LinksModel, SocialModel } from '@models';
import { HttpService, StorageService } from '@services';

@Component({
  selector: 'hashhouse-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  protected url!: string;
  protected social!: SocialModel[];
  protected productsLinks!: LinksModel[];
  protected servicesLinks!: LinksModel[];

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.populateFooterFromLocalStorage();
    this.loadOtherPages();
  }

  populateFooterFromLocalStorage() {
    const storageFooterData = this.storageService.get<FooterModel>(StorageService.KEYS.FOOTER);
    if (!storageFooterData) return;

    this.url = storageFooterData.url;
    this.social = storageFooterData.social;
    this.productsLinks = storageFooterData.productsLinks;
    this.servicesLinks = storageFooterData.servicesLinks;
  }

  loadOtherPages() {
    this.httpService.getPageData('home').subscribe();
    this.httpService.getPageData('about-us').subscribe();

    this.httpService.getProduct('pdu').subscribe();
    this.httpService.getProduct('psu').subscribe();
    this.httpService.getProduct('cables').subscribe();

    this.httpService.getFooter('footer')
      .subscribe((data: FooterModel) => {
        this.url = data.url;
        this.social = data.social;
        this.productsLinks = data.productsLinks;
        this.servicesLinks = data.servicesLinks;

        this.storageService.set(StorageService.KEYS.FOOTER, data);
      });
  }
}
