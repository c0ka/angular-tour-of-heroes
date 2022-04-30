import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from "@angular/cdk/drag-drop";
// Http request caching service
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { HttpInterceptorProvider } from './http-interceptors';
import { MessagesModule } from './messages/messages.module';
// user defined routing, components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComposeMessageComponent } from './components/compose-message/compose-message.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// user defined feature module
import { HeroesModule } from './heroes/heroes.module';
import { AuthModule } from './auth/auth.module';

import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HeroesModule,        // <-- Instant load
    MessagesModule,
    AuthModule,
    AppRoutingModule,    // <-- should be the last routing module loaded
    MatDividerModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    LayoutModule,
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap },
    HttpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // diagnostic only: inspect router configuration
  constructor(router: Router) {
    // use a custom replacer to display function names in the route configs
    // const replacer = (key: string, value: any) => (typeof value === 'function') ? 
    //   value.name : value
    
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2))
  }
}
