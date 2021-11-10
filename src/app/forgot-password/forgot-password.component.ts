import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup,FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: FormGroup;
  mailSent: boolean;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private fAuth: AngularFireAuth) {
    this.mailSent = false;

    this.userEmail = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email])
    });

    this.firebaseErrorMessage = '';
}


  ngOnInit(): void {
    this.fAuth.authState.subscribe(user => {               
      if (user) {
          this.userEmail.patchValue({
              email: user.email
          });
      }
  });

  }
  onSubmit(){
    if (this.userEmail.invalid){
            return;
    }
    this.authService.resetPassword(this.userEmail.value.email).then((result) => {
      if (result == null) {                               
          console.log('password reset email sent...');
          alert('password reset email sent...');
          this.mailSent = true;
          // this.router.navigate(['/dashboard']);        // when the user is logged in, navigate them to dashboard
      }
      else if (result.isValid == false) {
          console.log('login error', result);
          alert('password reset error. try again later');
          this.firebaseErrorMessage = result.message;
      }
  });

    
    
  }
}

