export class Resources {

  static get Constants(): any {

    // Peter Parker
    const peterParkerUrl = 'https://api.fluster.io';
    const peterParkerVersion = 'v1';
    const websiteUrl = 'https://fluster.io';

    const pwaUrl = 'https://m.fluster.io/';
    const domain = 'fluster.io';

    const localUniversalServerUrl = 'http://localhost:8000';

    const s3Url = 'https://peterparker-photos-eu.s3.dualstack.eu-west-1.amazonaws.com';

    // Third party keys
    const facebookAppId = '{{FACEBOOK_APP_ID}}';
    const googleWebClientId = '{{GOOGLE_LOGIN_WEB_CLIENT_ID}}';

    return {

      API: {
        SERVER_DOMAIN: peterParkerUrl,
        ITEMS: peterParkerUrl + '/' + peterParkerVersion + '/public/items/',
        HIGHLIGHTS: peterParkerUrl + '/' + peterParkerVersion + '/public/highlights/'
      },

      SERVER: {
        LOCAL_URL: localUniversalServerUrl
      },

      LOGIN: {
        DOMAIN: domain
      },

      AWS: {
        S3_URL: s3Url
      },

      COMPETITION: false,

      SOCIAL_SHARING: {
        FLUSTER_WEBSITE: websiteUrl,
        FLUSTER_TERMSOFUSE: websiteUrl + '/termsofuse',
        FLUSTER_SHARE_IMG: {
          URL: {
            STANDARD: websiteUrl + '/images/share/fluster_1200x630',
            SQUARE: websiteUrl + '/images/share/fluster_1080x1080',
          },
          EXT: '.png',
          MIME_TYPE: 'image/png'
        }
      },

      PHOTO: {
        MIME_TYPE: 'image/jpeg'
      },

      FACEBOOK: {
        ID: facebookAppId,
        API_VERSION: 'v3.0',
        SCOPE: ['public_profile', 'email', 'user_birthday', 'user_location', 'user_likes', 'user_gender'],
        PWA: {
          URL: 'https://www.facebook.com/',
          REDIRECT_URL: pwaUrl
        }
      },

      GOOGLE: {
        LOGIN: {
          WEB_CLIENT_ID: googleWebClientId,
          SCOPES: 'https://www.googleapis.com/auth/user.birthday.read',
          PWA: {
            URL: 'https://accounts.google.com/o/oauth2/v2/auth?',
            REDIRECT_URL: pwaUrl
          },
        }
      },

      ITEM: {
        TYPE: {
          TAKEOVER: 'takeover',
          SHARE: 'share'
        }
      },

      LOCATION: {
        GEO_TYPE: 'Point'
      }
    };
  }
}
