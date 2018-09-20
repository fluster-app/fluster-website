import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

import {LoginService} from '../../../providers/core/login/login.service';

@Component({
  selector: 'app-login-dialog',
  styleUrls: ['./login-dialog.component.scss'],
  templateUrl: './login-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginDialogComponent {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private translateService: TranslateService,
    private loginService: LoginService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getLang(): string {
    return this.translateService.currentLang;
  }

  navigateTermsOfUse() {
    this.router.navigate(['termsofuse']).then(() => {
      window.scrollTo(0, 0);
      this.onNoClick();
    });
  }

  facebookLogin() {
    this.loginService.facebookLogin();
  }

  googleLogin() {
    this.loginService.googleLogin();
  }

}
