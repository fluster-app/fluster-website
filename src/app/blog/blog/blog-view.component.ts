import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-view',
  styleUrls: ['./blog-view.component.scss'],
  templateUrl: './blog-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BlogViewComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

}
