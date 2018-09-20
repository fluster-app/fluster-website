import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

// Model
import {Item} from '../../../providers/model/item/item';

// Utils
import {Comparator} from '../../../providers/core/utils/utils';

// Services
import {HighlightsService} from '../../../providers/item/highlights/highlights.service';
import {Resources} from '../../../providers/core/utils/resources';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HighlightsComponent implements OnInit {

  RESOURCES: any = Resources.Constants;

  items: Item[];

  showImage: boolean = false;

  @Output() notifyHighlights: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router,
              private translateService: TranslateService,
              private highlightsService: HighlightsService) {
  }

  ngOnInit() {
    this.highlightsService.getHighlights().subscribe((results: Item[]) => {
      this.items = results;
      this.notifyLoaded();
    }, (error) => {
      // if nothing found, empty, we don't display the section
      this.items = new Array();
      this.notifyLoaded();
    });
  }

  private notifyLoaded() {
    this.notifyHighlights.emit(Comparator.hasElements(this.items));
  }

  hasItems(): boolean {
    return Comparator.hasElements(this.items);
  }

  navigate(item: Item) {
    this.highlightsService.selectedItem = item;

    let navigationExtras: NavigationExtras = {
      queryParams: {lang: this.translateService.currentLang}
    };

    this.router.navigate(['item', item.hashId], navigationExtras).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
