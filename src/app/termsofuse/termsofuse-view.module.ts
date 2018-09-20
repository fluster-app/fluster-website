import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {TermsofuseViewComponent} from './termsofuse-view.component';
import {ComponentsModule} from '../../components/core/components.module';

@NgModule({
  declarations: [TermsofuseViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TermsofuseViewComponent}
    ]),
    TranslateModule.forChild(),
    ComponentsModule
  ]
})
export class TermsofuseViewModule {

}
