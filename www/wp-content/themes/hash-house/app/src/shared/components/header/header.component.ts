import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hashhouse-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  //@ts-ignore
  pathUri: string = window.myPostData;

  @ViewChild("mobileNav") mobileNav!: ElementRef;

  constructor(
    private router: Router,
  ) { }

  async goToHomePageForm() {
    await this.router.navigate(['home'], { queryParams: { anchor: 'contact-form' } });
  }

  toggleMobileNavigation() {
    if (this.mobileNav.nativeElement.classList.contains('show')) {
      this.mobileNav.nativeElement.classList.remove('show');
    }
    else {
      this.mobileNav.nativeElement.classList.add('show');
    }
  }

  hideMobileNavigation() {
    this.mobileNav.nativeElement.classList.remove('show');
  }
}
