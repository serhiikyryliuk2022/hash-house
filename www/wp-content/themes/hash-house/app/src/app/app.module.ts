import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsRoutingModule } from './tabs/tabs-routing.module';
import { CacheInterceptor } from '@interceptors';
import { LoaderModule } from '@components';
import {
  DataResolverService,
  EventService,
  HttpService,
  LoaderService,
  StorageService
} from '@services';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TabsRoutingModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    LoaderModule,
  ],
  providers: [
    EventService,
    HttpService,
    DataResolverService,
    LoaderService,
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
