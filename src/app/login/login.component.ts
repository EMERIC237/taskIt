import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showResetPasswordForm: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    console.log(form.value);
    const { email, password } = form.value;
    this.authService.signIn(email, password).subscribe(
      (res) => {
        console.log('Auth Sign In Response:', res);
        this.router.navigateByUrl('/task-list');
      },
      (err) => {
        console.error('Auth Res Error:', err);
      }
    );
    form.reset();
  }
}
