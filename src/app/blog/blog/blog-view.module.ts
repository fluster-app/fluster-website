import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {BlogViewComponent} from './blog-view.component';
import {ComponentsModule} from '../../../components/core/components.module';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  declarations: [BlogViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogViewComponent}
    ]),
    TranslateModule.forChild(),
    ComponentsModule,
    MarkdownModule.forChild()
  ]
})
export class BlogViewModule {

}
