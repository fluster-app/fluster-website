import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {BlogPostViewComponent} from './blog-post-view.component';
import {ComponentsModule} from '../../../components/core/components.module';
import {MarkdownModule} from 'ngx-markdown';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {WebSocialShareModule} from '../../../components/core/web-social-share/web-social-share.module';

@NgModule({
  declarations: [BlogPostViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogPostViewComponent},
      { path: ':id', component: BlogPostViewComponent, pathMatch: 'full'}
    ]),
    TranslateModule.forChild(),
    ComponentsModule,
    MarkdownModule.forChild(),
    FontAwesomeModule,
    WebSocialShareModule
  ]
})
export class BlogPostViewModule {

}
