import { Component } from '@angular/core';
import { LoaderService } from '@services';

@Component({
  selector: 'hashhouse-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor(
    private loaderService: LoaderService
  ) {
  }

  get isShowLoading$() {
    return this.loaderService.isShowLoading$;
  }

  get isLoadingAnimationShow$() {
    return this.loaderService.isLoadingAnimationShow$;
  }

  get isLoadingAnimationHide$() {
    return this.loaderService.isLoadingAnimationHide$;
  }
}
