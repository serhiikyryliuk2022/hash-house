import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsRoutingModule } from './tabs/tabs-routing.module';
import { EventService, HttpService } from '@services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TabsRoutingModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    EventService,
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
