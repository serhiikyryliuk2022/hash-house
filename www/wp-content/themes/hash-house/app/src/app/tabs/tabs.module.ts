import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { TabsComponent } from './tabs.component';
import { ComponentsModule } from '@components';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.page';
import { PduComponent } from './pdu/pdu.page';
import { PsuComponent } from './psu/psu.page';
import { AboutComponent } from './about/about.page';
import { CablesComponent } from './cables/cables.page';
import { CommonModule } from '@angular/common'
import { IntroducingPage } from "./instruction/introducing.page";

@NgModule({
  declarations: [
    TabsComponent,

    AboutComponent,
    HomeComponent,
    PduComponent,
    PsuComponent,
    CablesComponent,
    IntroducingPage
  ],
  imports: [
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class TabsModule { }
