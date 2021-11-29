import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wellness';
  pageName: any;
  readonly ROOT_URL = "https://jsonplaceholder.typicode.com"

  posts: any;

  constructor(private http: HttpClient, private fAuth: AngularFireAuth, private router: Router) {
    this.pageName = router.url;
  }

  ngOnInit(): void {
    this.pageName = this.router.url;
  }

  getPosts() {
    this.posts = this.http.get(this.ROOT_URL + '/posts')
  }

}
