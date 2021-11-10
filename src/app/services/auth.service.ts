import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ifSignedin: boolean; 
  constructor(private router: Router, private fAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.ifSignedin = false;

    this.fAuth.onAuthStateChanged((user) => {           
        if (user) {
            this.ifSignedin = true;
        } else {
            this.ifSignedin = false;
        }
    });
}
SignIn(email: string, password: string): Promise<any>{
  return this.fAuth.signInWithEmailAndPassword(email, password).then(() => {
                console.log('Auth Service: loginUser: success');
                // this.router.navigate(['/dashboard']);
            }).catch(error => {
                console.log('login error...');
                console.log('error', error);
                //if (error.code)
                    return { isValid: false, message: error.message };
            });
}
Signup(user: any): Promise<any> {
  return this.fAuth.createUserWithEmailAndPassword(user.email, user.password).then((result) => {
          let email = user.email.toLowerCase();
          this.fireStore.doc('/users/' + email)                        
              .set({
                  userName: user.userName,
                  email: email                 
              });
              result.user.sendEmailVerification();                    
      }).catch(error => {
          console.log('signup error', error);
          console.log('error', error);
          //if (error.code)
              return { isValid: false, message: error.message };
      });
}
async resendVerificationEmail() {                         
  return (await this.fAuth.currentUser).sendEmailVerification()
      .then(() => {
          // this.router.navigate(['home']);
      })
      .catch(error => {
          console.log('sendVerificationEmail error...');
          console.log('error', error);
          if (error.code)
              return error;
      });
}

logoutUser(): Promise<void> {
  return this.fAuth.signOut().then(() => {
          this.router.navigate(['/home']);                    
      }).catch(error => {
          console.log('logout error...');
          console.log('error', error);
          if (error.code)
              return error;
      });
}
setUserInfo(payload: object) {
  console.log('saving user info...');
  this.fireStore.collection('users')
      .add(payload).then(function (res) {
          console.log("setUserInfo response...")
          console.log(res);
      })
}

getUser() {
  return this.fAuth.currentUser;                                 
}

resetPassword(email: string): Promise<any> {
    return this.fAuth.sendPasswordResetEmail(email)
        .then(() => {
            console.log('reset password success');
            // this.router.navigate(['/amount']);
        })
        .catch(error => {
            console.log('reset password error...');
            console.log(error)
            if (error.code)
                return error;
        });
}




}
