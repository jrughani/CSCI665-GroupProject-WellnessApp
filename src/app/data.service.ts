import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  constructor(private http: HttpClient) { }

  // getTimeFrame(e, timeFrame: string): string {
  //   timeFrame = e.innerHTML
  //   return timeFrame
  // }

  getRandomMeals() {
    return this.http.get("https://api.spoonacular.com/recipes/random?number=3&apiKey=f54682d328d44737904ba650a1de23e4").toPromise().then((data) => {
      return data
    })
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').toPromise().then((data) => {
      return data
    })
  }


  
}
