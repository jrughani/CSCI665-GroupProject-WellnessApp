import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apiKey:string="f54682d328d44737904ba650a1de23e4";
  // Results from get request
  searchQuery:string='';
  searchIngredients:string='';
  recipeList:any;
  recipeLinks:any=[];
  ingredients:any=[];


  
  constructor( private http: HttpClient) { }

  ngOnInit(): void {
  }

  generateMealPlan() {
    
  }

  setQuery(e) {
    this.searchQuery = e.innerText
    console.log(this.searchQuery)
  }

  async searchRecipe() {
    this.searchIngredients = this.searchIngredients.replace(",", ",+")
    console.log(  this.searchIngredients)

    return this.http.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.searchIngredients}&number=12&apiKey=${this.apiKey}`).toPromise().then((data) => {
    this.recipeList = data
    // this.recipeLinks.push(`${'-'+this.recipeList.id}${}`)
    
    this.getLinks()
    
    console.log(this.recipeList)

    // this.recipeList.title.replace(' ','-')
    })
  }

getLinks() {

  // this.recipeList.map((recipe:any) =>  
  // (recipe.missedIngredients.map((ingredient:any) => (
  //  console.log(ingredient.name) 
  // )))
  // )

  this.recipeList.map((recipe:any) =>  
  (this.recipeLinks.push(`https://spoonacular.com/recipes/${recipe.title.split(' ').join('-')}-${recipe.id}`)))
  console.log(this.recipeLinks)
}
  
}
