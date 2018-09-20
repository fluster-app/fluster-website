import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformServer} from '@angular/common';

import * as moment from 'moment';

// Utils
import {Validator} from '../utils/utils';
import {Resources} from '../utils/resources';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(DOCUMENT) private document: Document) {

  }

  private writeCookieState(state: string, googleAuth: boolean): Promise<{}> {

    return new Promise((resolve) => {

      const baseDomain = '.' + Resources.Constants.LOGIN.DOMAIN;
      const expireAfter: Date = moment(new Date()).add(5, 'm').toDate();

      this.document.cookie = 'Fluster_state={"state":"' + state + '", "googleAuth": ' + googleAuth + '}; expires=' + expireAfter + '; domain=' + baseDomain + '; path=/';

      resolve();
    });

  }

  facebookLogin() {

    if (isPlatformServer(this.platformId)) {
      return;
    }

    const state: string = Validator.generateRandomString(16);

    this.writeCookieState(state, false).then(() => {
      const fbUrl: string = Resources.Constants.FACEBOOK.PWA.URL + Resources.Constants.FACEBOOK.API_VERSION + '/dialog/oauth?client_id=' + Resources.Constants.FACEBOOK.ID + '&redirect_uri=' + encodeURIComponent(Resources.Constants.FACEBOOK.PWA.REDIRECT_URL) + '&state=' + state + '&scope=' + Resources.Constants.FACEBOOK.SCOPE.toString();

      this.document.location.href = fbUrl;
    });
  }

  googleLogin() {

    if (isPlatformServer(this.platformId)) {
      return;
    }

    const state: string = Validator.generateRandomString(16);

    this.writeCookieState(state, true).then(() => {
      const googleUrl: string = Resources.Constants.GOOGLE.LOGIN.PWA.URL + 'client_id=' + Resources.Constants.GOOGLE.LOGIN.WEB_CLIENT_ID + '&response_type=code&scope=openid%20profile%20email%20' + Resources.Constants.GOOGLE.LOGIN.SCOPES + '&redirect_uri=' + encodeURIComponent(Resources.Constants.GOOGLE.LOGIN.PWA.REDIRECT_URL) + '&nonce=' + state + '&state=' + state;

      this.document.location.href = googleUrl;
    });
  }

}
