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
                if (error.code)
                    return { isValid: false, message: error.message };
            });
}
Signup(user: any): Promise<any> {
  return this.fAuth.createUserWithEmailAndPassword(user.email, user.password).then((result) => {
          let emailLower = user.email.toLowerCase();
          this.fireStore.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
              .set({
                  displayName: user.displayName,
                  email: emailLower                 
              });
              result.user.sendEmailVerification();                    // immediately send the user a verification email
      }).catch(error => {
          console.log('signup error', error);
          console.log('error', error);
          if (error.code)
              return { isValid: false, message: error.message };
      });
}



}
