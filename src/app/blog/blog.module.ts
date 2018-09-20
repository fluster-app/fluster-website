import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', loadChildren: './blog/blog-view.module#BlogViewModule'},
      {path: 'post', loadChildren: './post/blog-post-view.module#BlogPostViewModule'},
    ]),
    MarkdownModule.forRoot()
  ]
})
export class BlogModule {

}
