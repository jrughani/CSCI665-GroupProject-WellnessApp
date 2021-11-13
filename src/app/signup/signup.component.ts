import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private fAuth: AngularFireAuth) {
    this.firebaseErrorMessage = '';
}


  ngOnInit(): void {
    if (this.authService.ifSignedin) {                       
      this.router.navigate(['/dashboard']);
    }

    this.signupForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
  });
  }
  onSignup(){
    if (this.signupForm.invalid){                            
            return;
    }
    
    this.authService.Signup(this.signupForm.value).then((result) => {
            if (result == null) {                              
                this.router.navigate(['/dashboard']);
                alert('Success. Please verify your email');
              }
            else if (result.isValid == false){
                this.firebaseErrorMessage = result.message;
                alert('Firebase error '+ this.firebaseErrorMessage);
              }

        }).catch(() => {
        });


  }

}
