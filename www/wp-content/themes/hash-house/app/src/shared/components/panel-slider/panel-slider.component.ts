import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PanelSliderModel, ProductModel } from '@models';

@Component({
  selector: 'hashhouse-panel-slider',
  templateUrl: './panel-slider.component.html',
  styleUrls: ['./panel-slider.component.scss'],
})
export class PanelSliderComponent {

  @Input() items: PanelSliderModel[] = [];
  @Input() product: ProductModel = {};
  @Input() url: string = '';

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
  }

  selectSlide(index: number) {
    this.currentIndex = index;
    this.activeItem = this.items[this.currentIndex];
    this.moveSlider();
  }
}
