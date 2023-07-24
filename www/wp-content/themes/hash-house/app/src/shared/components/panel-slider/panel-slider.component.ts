import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PanelSliderModel, ProductModel} from '@models';

@Component({
  selector: 'hashhouse-panel-slider',
  templateUrl: './panel-slider.component.html',
  styleUrls: ['./panel-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PanelSliderComponent {
  //@ts-ignore
  pathUri: string = window.myPostData;

  @Input() items: PanelSliderModel[] = [];
  @Input() product: ProductModel = {};

  @Output() onItemClick = new EventEmitter<string | null>();

  activeItem?: PanelSliderModel;

  currentIndex: number = 0;

  ngOnChanges(): void {
    this.activeItem = this.items[0];
  }

  previousSlide() {
    if (this.currentIndex === 0) return;
    this.currentIndex--;
    this.activeItem = this.items[this.currentIndex];
    this.moveSlider();
  }

  nextSlide() {
    if (this.currentIndex === this.items.length - 1) return;
    this.currentIndex++;
    this.activeItem = this.items[this.currentIndex];
    this.moveSlider();
  }

  moveSlider() {
    const gap = 10;
    const slideWidth = 75 + gap;

    const slider = document.querySelector('.slider') as HTMLElement;
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }

  itemClick() {
    this.onItemClick.emit(this.activeItem?.id);

    this.notImplemented();
  }

  selectSlide(index: number) {
    this.currentIndex = index;
    this.activeItem = this.items[this.currentIndex];
    this.moveSlider();
  }

  private notImplemented() {
    alert("Not implemented yet");
  }
}
