import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-menu-dialog',
  styleUrls: ['./menu-dialog.component.scss'],
  templateUrl: './menu-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MenuDialogComponent {

  highlights: boolean = true;
  onlyBlog: boolean = false;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    private translateService: TranslateService) {
  }

  private close(): void {
    this.dialogRef.close();
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

  navigateHome() {
    this.router.navigate(['']).then(() => {
      window.scrollTo(0, 0);
      this.close();
    });
  }

  navigateBlog() {
    this.router.navigate(['/blog']).then(() => {
      window.scrollTo(0, 0);
      this.close();
    });
  }

}
