import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wellness';

  readonly ROOT_URL = "https://jsonplaceholder.typicode.com"

  posts: any;

  constructor(private http: HttpClient) {}

  getPosts() {
    this.posts = this.http.get(this.ROOT_URL + '/posts')
  }
}
