import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  onSignout() {
    this.fAuth.signOut();
    alert('signed out');
  }

}
