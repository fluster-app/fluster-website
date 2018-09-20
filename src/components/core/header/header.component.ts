import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from '../login/login-dialog.component';
import {MenuDialogComponent} from '../menu/menu-dialog.component';
import {Comparator} from '../../../providers/core/utils/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() fixed = false;

  @Input() navigation = true;

  @Input() highlights = true;
  @Input() onlyBlog = false;

  @Input() showNotFixedNavBrand = false;

  scrolled = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrolledSize: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = scrolledSize > 60;
  }

  navigateHome() {
    this.router.navigate(['']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  openLoginDialog(): void {
    const currentDialog = this.dialog.getDialogById('loginDialog');
    if (!Comparator.isEmpty(currentDialog)) {
      return;
    }

    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '420px',
      id: 'loginDialog',
      backdropClass: 'loginBackdrop',
      panelClass: 'loginPanel',
      hasBackdrop: true,
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Donothing
    });
  }

  openMenuDialog(): void {
    const currentDialog = this.dialog.getDialogById('menuDialog');
    if (!Comparator.isEmpty(currentDialog)) {
      return;
    }

    const dialogRef = this.dialog.open(MenuDialogComponent, {
      width: '420px',
      id: 'menuDialog',
      backdropClass: 'menuBackdrop',
      panelClass: 'menuPanel',
      hasBackdrop: true,
      autoFocus: false,
      data: {
        highlights: this.highlights,
        onlyBlog: this.onlyBlog
      }
    });

    dialogRef.componentInstance.highlights = this.highlights;
    dialogRef.componentInstance.onlyBlog = this.onlyBlog;

    dialogRef.afterClosed().subscribe(result => {
      // Donothing
    });
  }

}
