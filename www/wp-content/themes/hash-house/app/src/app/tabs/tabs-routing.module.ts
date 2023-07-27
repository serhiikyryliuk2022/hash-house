import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.page";
import { CablesComponent } from "./cables/cables.page";
import { HomeComponent } from "./home/home.page";
import { OthersComponent } from "./others/others.page";
import { PduComponent } from "./pdu/pdu.page";
import { PsuComponent } from "./psu/psu.page";
import { TabsComponent } from "./tabs.component";
import { DataResolverService } from "@services";
import {ImmersionPage} from "./immersion/immersion.page";

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: {
          data: DataResolverService
        }
      },
    ]
  },
  {
    path: 'pdu',
    component: TabsComponent,
    children: [
      {
        path: '',
        component: PduComponent,
        resolve: {
          data: DataResolverService
        }
      },
    ]
  },
  {
    path: 'psu',
    component: TabsComponent,
    children: [
      {
        path: '',
        component: PsuComponent,
        resolve: {
          data: DataResolverService
        }
      },
    ]
  },
  {
    path: 'cables',
    component: TabsComponent,
    children: [
      {
        path: '',
        component: CablesComponent,
        resolve: {
          data: DataResolverService
        }
      },
    ]
  },
  {
    path: 'others',
    component: TabsComponent,
    children: [
      {
        path: '',
        component: OthersComponent,
        resolve: {
          data: DataResolverService
        }
      },
    ]
  },
  {
    path: 'about',
    component: TabsComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
        resolve: {
          data: DataResolverService
        }
      },
    ]
  },
  {
    path: 'immersion',
    component: TabsComponent,
    children: [
      {
        path: '',
        component: ImmersionPage,
        resolve: {
          data: DataResolverService
        }
      },
    ]
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsRoutingModule { }
