import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
signinForm: FormGroup;
firebaseErrorMessage: string;
constructor(private authService: AuthService, private router: Router, private fAuth: AngularFireAuth) {
  this.signinForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });
  this.firebaseErrorMessage = '';
}

  ngOnInit(): void {
    if (this.authService.ifSignedin) {                       
      this.router.navigate(['/dashboard']);
    }
  }
  onSignin(){
    if (this.signinForm.invalid){
            return;
    }
    this.authService.SignIn(this.signinForm.value.email, this.signinForm.value.password).then((result) => {
      if (result == null) {                               
          console.log('logging in...');
          alert('Login successful');
          this.router.navigate(['/dashboard']);      
      }
      else if (result.isValid == false) {
          console.log('login error', result);
          alert('login error ' + result.message);
          this.firebaseErrorMessage = result.message;
          console.log(this.firebaseErrorMessage);
      }
  });




  }
  

}
