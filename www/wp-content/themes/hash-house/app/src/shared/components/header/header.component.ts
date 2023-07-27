import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'hashhouse-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() url!: string;

  @ViewChild("mobileNav") mobileNav!: ElementRef;

  constructor(
  ) { }

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
