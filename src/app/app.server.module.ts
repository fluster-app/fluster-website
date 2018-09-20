import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';

export function getRequestFactory(request: Request) {
  return request;
}

import {translateFactory} from '../providers/core/translate/translate-universal-loader.service';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory
      }
    }),
    FontAwesomeModule
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
  providers: [
    {
      provide: 'req',
      useFactory: getRequestFactory,
      deps: [REQUEST]
    }
  ]
})
export class AppServerModule {}
