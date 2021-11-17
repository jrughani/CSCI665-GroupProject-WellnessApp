import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router,CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { useAnimation } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private fAuth: AngularFireAuth) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {
        this.fAuth.onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                resolve(true);
            } else {
                alert('user not signed in or verified, redirected to home');
                this.fAuth.signOut();
                this.router.navigate(['/home']);  
                resolve(false);
            }
        });
    });
}

}
