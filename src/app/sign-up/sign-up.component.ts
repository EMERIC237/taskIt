import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { appRoutes } from '../data/routes';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) {}
  onSignUp(formObj: NgForm) {
    if (!formObj.valid) return;
    const { email, password } = formObj.value;
    console.log(formObj.value);
    this.authService.signUp(email, password).subscribe(
      (res) => {
        console.log('signup Response succes: ', res);
      },
      (err) => {
        console.log('signup failed: ', err);
      }
    );
    this.router.navigateByUrl(appRoutes.taskList);
    formObj.reset();
  }
}
