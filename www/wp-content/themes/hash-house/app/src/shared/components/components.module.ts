import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PanelSliderComponent } from './panel-slider/panel-slider.component';
import { PanelTableComponent } from './panel-table/panel-table.component';
import { DescriptionCardComponent } from './description-card/description-card.component';
import { PanelDetailsComponent } from './panel-details/panel-details.component';
import { PanelDownloadComponent } from './panel-download/panel-download.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '@services';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DescriptionCardComponent,
    PanelDetailsComponent,
    PanelDownloadComponent,
    PanelSliderComponent,
    PanelTableComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DescriptionCardComponent,
    PanelDetailsComponent,
    PanelDownloadComponent,
    PanelSliderComponent,
    PanelTableComponent,
  ],
  providers: [LoaderService],
})
export class ComponentsModule { }
