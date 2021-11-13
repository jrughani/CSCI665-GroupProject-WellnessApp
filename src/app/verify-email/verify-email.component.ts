import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  mailSent: boolean;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private fAuth: AngularFireAuth) {
    this.mailSent = false;

    this.firebaseErrorMessage = '';
}

  ngOnInit(): void {
    this.fAuth.authState.subscribe(user => {               
      if (user) {
        this.authService.resendVerificationEmail().then((result) => {
          if (result == null) {                               // null is success, false means there was an error
              console.log('verification email resent...');
              this.mailSent = true;
          }
          else if (result.isValid == false) {
              console.log('verification error', result);
              this.firebaseErrorMessage = result.message;
          }
      });

      }else{
        alert('You need to be logged in for this feature');
      }
  });
  }
  onHome(){
    this.router.navigate(['/home']);
  }

}
