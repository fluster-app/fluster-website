import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeViewComponent} from './home/home-view.component';
import {TransferHttpCacheModule} from '@nguniversal/common';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export function getRequest() {
  return {headers: null};
}

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ComponentsModule} from '../components/core/components.module';

import {translateFactory} from '../providers/core/translate/translate-universal-loader.service';

import {HighlightsModule} from '../components/core/highlights/highlights.module';

import {HttpInterceptorService} from '../providers/core/http/http-interceptor-service';

import {DeferLoadModule} from '../directives/core/lazy/defer-load.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'fluster'}),
    TransferHttpCacheModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeViewComponent, pathMatch: 'full'},
      {path: 'item', loadChildren: './item/item-view.module#ItemViewModule'},
      {path: 'termsofuse', loadChildren: './termsofuse/termsofuse-view.module#TermsofuseViewModule'},
      {path: 'blog', loadChildren: './blog/blog.module#BlogModule'},
      {path: '**', redirectTo: ''}
    ], {initialNavigation: 'enabled'}),
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: translateFactory
        }
      }
    ),
    ComponentsModule,
    HighlightsModule,
    FontAwesomeModule,
    DeferLoadModule
  ],
  declarations: [AppComponent, HomeViewComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: [
    {provide: 'req', useFactory: getRequest},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ]
})
export class AppModule {
}
