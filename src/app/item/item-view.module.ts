import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {ComponentsModule} from '../../components/core/components.module';
import {SliderModule} from '../../components/core/slider/slider.module';
import {GoogleMapModule} from '../../components/core/google/google-map/google-map.module';

import {ItemViewComponent} from './item-view.component';
import {ItemsService} from '../../providers/item/item/items.service';
import {GoogleStyleService} from '../../providers/core/map/google-style.service';
import {ItemSummaryModule} from '../../components/core/item-summary/item-summary.module';
import {WebSocialShareModule} from '../../components/core/web-social-share/web-social-share.module';

@NgModule({
  declarations: [ItemViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: ItemViewComponent, pathMatch: 'full'}
    ]),
    TranslateModule.forChild(),
    ComponentsModule,
    SliderModule,
    GoogleMapModule,
    ItemSummaryModule,
    WebSocialShareModule
  ],
  providers: [
    ItemsService,
    GoogleStyleService
  ]
})
export class ItemViewModule {

}
