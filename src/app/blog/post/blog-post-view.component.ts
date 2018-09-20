import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, Meta, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';

import {MarkdownService} from 'ngx-markdown';

// Utils
import {Comparator} from '../../../providers/core/utils/utils';
import {Resources} from '../../../providers/core/utils/resources';

@Component({
  selector: 'app-blog-post-view',
  styleUrls: ['./blog-post-view.component.scss'],
  templateUrl: './blog-post-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BlogPostViewComponent implements OnInit, OnDestroy {

  private RESOURCES: any = Resources.Constants;

  private sub: Subscription;

  private postId: string;

  post: string;
  notFound: boolean = false;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private markdownService: MarkdownService,
              private meta: Meta) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async (params) => {
      this.postId = params['id'];
      this.post =  './assets/blog/post/' + this.postId + '.md';
      await this.updateMetadata();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onError($event) {
    this.notFound = true;
  }

  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private updateMetadata(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      if (!Comparator.isStringEmpty(this.post) && !Comparator.isStringEmpty(this.postId)) {
        const content: string = await this.markdownService.getSource(this.post).toPromise();

        const titles: string[] = content.match(/(?:#\s)(.*)/g);
        const images: string[] = content.match(/(?:\/assets\/blog\/img\/post)(.*)(?:jpg|gif)/g);

        this.meta.updateTag({property: 'og:type', content: 'article'});
        this.meta.updateTag({property: 'og:url', content: 'https://fluster.io/blog/post/' + this.postId});

        if (Comparator.hasElements(images)) {
          this.meta.updateTag({
            property: 'og:image',
            content: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + images[0]
          });

          this.meta.updateTag({
            property: 'og:image:secure_url',
            content: this.RESOURCES.SOCIAL_SHARING.FLUSTER_WEBSITE + images[0]
          });
        }

        if (Comparator.hasElements(titles)) {
          let desc: string = titles[0].split(/\s(.*)/)[1];

          if (!Comparator.isStringEmpty(desc)) {

            if (titles.length > 1) {
              const extra: string = titles[1].split(/\s(.*)/)[1];

              if (!Comparator.isStringEmpty(extra)) {
                desc = desc + ' | ' + extra;
              }

              this.meta.updateTag({name: 'description', content: desc});
              this.meta.updateTag({property: 'og:description', content: desc});
            }
          }
        }
      }

      resolve();
    });
  }
}

