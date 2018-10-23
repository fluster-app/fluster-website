import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {WebSocialShareComponent} from './web-social-share';

@NgModule({
    declarations: [
        WebSocialShareComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild()
    ],
    exports: [
        WebSocialShareComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebSocialShareModule {
}
