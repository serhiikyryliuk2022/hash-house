import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.page";
import { CablesComponent } from "./cables/cables.page";
import { HomeComponent } from "./home/home.page";
import { OthersComponent } from "./others/others.page";
import { PduComponent } from "./pdu/pdu.page";
import { PsuComponent } from "./psu/psu.page";
import { TabsComponent } from "./tabs.component";
import {IntroducingPage} from "./instruction/introducing.page";

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      { path: '', component: HomeComponent, },
    ]
  },
  {
    path: 'pdu',
    component: TabsComponent,
    children: [
      { path: '', component: PduComponent, },
    ]
  },
  {
    path: 'psu',
    component: TabsComponent,
    children: [
      { path: '', component: PsuComponent, },
    ]
  },
  {
    path: 'cables',
    component: TabsComponent,
    children: [
      { path: '', component: CablesComponent, },
    ]
  },
  {
    path: 'others',
    component: TabsComponent,
    children: [
      { path: '', component: OthersComponent, },
    ]
  },
  {
    path: 'about',
    component: TabsComponent,
    children: [
      { path: '', component: AboutComponent, },
    ]
  },
  {
    path: 'immersion',
    component: TabsComponent,
    children: [
      { path: '', component: IntroducingPage, },
    ]
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsRoutingModule { }
