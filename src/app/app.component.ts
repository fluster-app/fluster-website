import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {Meta} from '@angular/platform-browser';

import {Observable, Subscription} from 'rxjs';

import {TranslateService} from '@ngx-translate/core';
import {isPlatformServer} from '@angular/common';

import {Resources} from '../providers/core/utils/resources';
import {Comparator} from '../providers/core/utils/utils';

import {TranslateSwitcherService} from '../providers/core/translate/translate-switcher.service';

import * as moment from 'moment';

import 'moment/locale/fr';
import 'moment/locale/de';
import 'moment/locale/it';


import {library} from '@fortawesome/fontawesome-svg-core';

import {faCircle as faCircleSolid} from '@fortawesome/pro-solid-svg-icons/faCircle';
import {faFilter} from '@fortawesome/pro-solid-svg-icons/faFilter';
import {faMapMarkerAlt} from '@fortawesome/pro-solid-svg-icons/faMapMarkerAlt';
import {faPencil} from '@fortawesome/pro-solid-svg-icons/faPencil';
import {faUsers} from '@fortawesome/pro-solid-svg-icons/faUsers';
import {faHeart as faHeartSolid} from '@fortawesome/pro-solid-svg-icons/faHeart';

import {faCalendarCheck} from '@fortawesome/pro-regular-svg-icons/faCalendarCheck';
import {faChevronLeft} from '@fortawesome/pro-regular-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/pro-regular-svg-icons/faChevronRight';
import {faCircle as faCircleRegular} from '@fortawesome/pro-regular-svg-icons/faCircle';
import {faEnvelope} from '@fortawesome/pro-regular-svg-icons/faEnvelope';
import {faGift} from '@fortawesome/pro-regular-svg-icons/faGift';
import {faPaperPlane} from '@fortawesome/pro-regular-svg-icons/faPaperPlane';
import {faSearch} from '@fortawesome/pro-regular-svg-icons/faSearch';
import {faHeart} from '@fortawesome/pro-regular-svg-icons/faHeart';
import {faTimesCircle} from '@fortawesome/pro-regular-svg-icons/faTimesCircle';

import {faFacebookF} from '@fortawesome/free-brands-svg-icons/faFacebookF';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import {faGithub} from '@fortawesome/free-brands-svg-icons/faGithub';
import {faOsi} from '@fortawesome/free-brands-svg-icons/faOsi';

import {faChevronDown} from '@fortawesome/pro-light-svg-icons/faChevronDown';
import {faSadCry} from '@fortawesome/pro-light-svg-icons/faSadCry';
import {faLightbulbOn} from '@fortawesome/pro-light-svg-icons/faLightbulbOn';
import {faHourglassEnd} from '@fortawesome/pro-light-svg-icons/faHourglassEnd';
import {faGift as faGiftLight} from '@fortawesome/pro-light-svg-icons/faGift';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  RESOURCES: any = Resources.Constants;

  private translateSubscription: Subscription;

  private cookieBanner: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject('req') private req: any,
              private meta: Meta,
              private translateService: TranslateService,
              private translateSwitcherService: TranslateSwitcherService) {

    this.initFontAwesome();

    this.translateSubscription = this.translateSwitcherService.watch().subscribe((lang: string) => {
      this.translateService.use(lang).subscribe(() => {
        this.initMoment();
        this.updateCookieConsent();
      });
    });
  }

  ngOnInit() {
    this.printFlusterToConsole();

    this.initLang().subscribe(() => {
      this.initMoment();

      if (isPlatformServer(this.platformId)) {
        this.addMetaTags();
      } else {
        window.addEventListener('load', () => {
          this.initCookieConsent();
        });
      }
    });
  }

  private initMoment() {
    moment.locale(this.translateService.currentLang);
  }

  ngOnDestroy(): void {
    if (this.translateSubscription != null) {
      this.translateSubscription.unsubscribe();
    }
  }

  private initLang(): Observable<Object> {
    this.translateService.addLangs(['en', 'de', 'fr', 'it']);
    this.translateService.setDefaultLang('en');

    if (isPlatformServer(this.platformId)) {
      return this.initLangServer();
    } else {
      return this.initLangBrowser();
    }
  }

  private initLangBrowser(): Observable<Object> {
    const url: URL = new URL(window.location.href);
    const langParam: string = url.searchParams.get('lang');

    let lang: string;
    if (!Comparator.isStringEmpty(langParam)) {
      lang = /(de|en|fr|it)/gi.test(langParam) ? langParam : this.translateService.getBrowserLang();
    } else {
      lang = this.translateService.getBrowserLang();
    }

    const match = (lang || '').match(/(en|de|fr|it)/);

    return this.translateService.use(match ? match[0] : 'en');
  }

  private initLangServer(): Observable<Object> {
    // We provide param in sitemap.xml to try to index the site in different languages in search engines
    if (!Comparator.isEmpty(this.req.query) && !Comparator.isStringEmpty(this.req.query.lang)) {
      const userLangParameter: string = /(de|en|fr|it)/gi.test(this.req.query.lang) ? this.req.query.lang : 'en';
      return this.translateService.use(userLangParameter);
    } else {
      const acceptLanguage: string = this.req.headers['accept-language'];

      if (Comparator.isStringEmpty(acceptLanguage)) {
        return this.translateService.use('en');
      } else {
        const languages: string[] = acceptLanguage.match(/[a-zA-Z\-]{2,10}/g) || [];

        if (languages.length > 0) {
          let userLang: string = languages[0].split('-')[0];
          userLang = /(de|en|fr|it)/gi.test(userLang) ? userLang : 'en';

          return this.translateService.use(userLang);
        } else {
          return this.translateService.use('en');
        }
      }
    }
  }

  private addMetaTags() {

    const title: string = this.translateService.instant('META.TITLE');

    this.meta.updateTag({name: 'title', content: title});

    this.meta.updateTag({property: 'og:site_name', content: title});
    this.meta.updateTag({property: 'og:title', content: title});

    this.meta.updateTag({property: 'fb:app_id', content: this.RESOURCES.FACEBOOK.ID});

    this.addConditionalRouteMetaTags();
  }

  private addConditionalRouteMetaTags() {
    // We only set the following meta tags if we are not displaying an item or a blog post
    // For these new meta tags will be interpreted inside their routes
    if (Comparator.isStringEmpty(this.req.originalUrl) ||
        (this.req.originalUrl.indexOf('/item/') === -1 && (this.req.originalUrl.indexOf('/blog/post/') == -1))) {
      const description = this.translateService.instant('META.DESCRIPTION');

      this.meta.updateTag({name: 'description', content: description});
      this.meta.updateTag({property: 'og:description', content: description});

      this.meta.updateTag({property: 'og:type', content: 'website'});
      this.meta.updateTag({property: 'og:url', content: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE});

      this.addImgMetaTags();
    }
  }

  private addImgMetaTags() {
    let imageUrl: string = this.RESOURCES.SOCIAL_SHARING.FLUSTER_SHARE_IMG.URL.STANDARD;

    if (!Comparator.isStringEmpty(this.translateService.currentLang) &&
      (Comparator.equals(this.translateService.currentLang, 'de') ||
        Comparator.equals(this.translateService.currentLang, 'fr') ||
        Comparator.equals(this.translateService.currentLang, 'it'))) {
      imageUrl += '_' + this.translateService.currentLang;
    }

    imageUrl += Resources.Constants.SOCIAL_SHARING.FLUSTER_SHARE_IMG.EXT;

    this.meta.updateTag({property: 'og:image', content: imageUrl});
    this.meta.updateTag({property: 'og:image:secure_url', content: imageUrl});
    this.meta.updateTag({
      property: 'og:image:type',
      content: this.RESOURCES.SOCIAL_SHARING.FLUSTER_SHARE_IMG.MIME_TYPE
    });
  }

  private printFlusterToConsole() {
    if (!isPlatformServer(this.platformId)) {
      // IE9: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
      const log: any = Function.prototype.bind.call(console.log, console);
      log.apply(console, ['%cFLUSTER', 'color: #ff65a9;font-size:6rem;font-weight: 300;']);
      log.apply(console, ['%cRoommates next door', 'color: #2d294c;font-size:1rem;font-weight: 300;']);
    }
  }

  private initFontAwesome() {
    library.add(faChevronDown);
    library.add(faUsers);
    library.add(faPencil);
    library.add(faFilter);
    library.add(faCalendarCheck);
    library.add(faSearch);
    library.add(faPaperPlane);
    library.add(faMapMarkerAlt);
    library.add(faGift);
    library.add(faHeart);
    library.add(faHeartSolid);
    library.add(faFacebookF);
    library.add(faFacebook);
    library.add(faInstagram);
    library.add(faTwitter);
    library.add(faEnvelope);
    library.add(faChevronLeft);
    library.add(faChevronRight);
    library.add(faCircleSolid);
    library.add(faCircleRegular);
    library.add(faTimesCircle);
    library.add(faSadCry);
    library.add(faGithub);
    library.add(faOsi);
    library.add(faLightbulbOn);
    library.add(faHourglassEnd);
    library.add(faGiftLight);
  }

  private initCookieConsent() {
    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#ffffff'
        },
        button: {
          background: '#ff65a9',
          text: '#ffffff'
        }
      },
      theme: 'classic',
      content: {
        href: this.RESOURCES.SOCIAL_SHARING.FLUSTER_TERMSOFUSE,
        message: this.translateService.instant('COOKIE.MESSAGE'),
        dismiss: this.translateService.instant('COOKIE.DISMISS'),
        link: this.translateService.instant('COOKIE.LEARN_MORE')
      }
    }, (popup: any) => {
      this.cookieBanner = popup;
      this.cookieBanner.autoOpen();
    }, (err) => {
      // Do nothing
    });
  }

  private updateCookieConsent() {
    if (this.cookieBanner) {
      this.cookieBanner.destroy();
      this.initCookieConsent();
    }
  }

}
