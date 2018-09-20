import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {CompetitionViewComponent} from './competition-view.component';
import {ComponentsModule} from '../../components/core/components.module';

@NgModule({
  declarations: [CompetitionViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CompetitionViewComponent}
    ]),
    TranslateModule.forChild(),
    ComponentsModule
  ]
})
export class CompetitionViewModule {

}
