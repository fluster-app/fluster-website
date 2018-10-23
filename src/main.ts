import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';

import { defineCustomElements as defineCustomElementsSocialShare } from 'web-social-share/dist/loader';
import { defineCustomElements as defineCustomElementsGoogleMaps } from 'web-google-maps/dist/loader';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule);
});

defineCustomElementsSocialShare(window);
defineCustomElementsGoogleMaps(window);
