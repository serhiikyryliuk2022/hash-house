import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule) },
  { path: '**', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: "enabled",
    scrollPositionRestoration: 'top',
    scrollOffset: [0, 100],
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }