import {NgModule} from '@angular/core';
import {BrowserTransferStateModule} from '@angular/platform-browser';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {translateFactory} from '../providers/core/translate/translate-universal-loader.service';

import 'hammerjs';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AppModule,
    BrowserTransferStateModule,
    TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: translateFactory
        }
      }
    ),
    FontAwesomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
