import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRandomMeals() {
    return this.http.get("https://api.spoonacular.com/recipes/random?number=3&apiKey=2748398f60524fc090d89b2009c9e4a1").toPromise().then((data) => {
      return data
    })
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').toPromise().then((data) => {
      return data
    })
  }
  
}
