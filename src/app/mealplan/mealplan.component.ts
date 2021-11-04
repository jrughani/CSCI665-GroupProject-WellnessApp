import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealplanComponent implements OnInit {

  results: any;
  randomMealsResult: any;
  randomMealsImages: any;
  randomMealsTitle: any;
  randomMealsServing: any;
  randomMeals:any;

  constructor(private service: DataService) {}

  ngOnInit() {
    this.service.getRandomMeals().then((res) => {
      // Results response is set to our observable or whatever they're called
      this.randomMealsResult = res;
        // Testing, getting to know Angular

        this.randomMealsImages = this.randomMealsResult.recipes.map((recipe:any)=> recipe.image)
        this.randomMealsTitle = this.randomMealsResult.recipes.map((recipe:any)=> recipe.title)
        this.randomMealsServing = this.randomMealsResult.recipes.map((recipe:any)=> recipe.serving)
        // Console logging results to check if they work
        console.log(this.randomMealsResult)
        console.log(this.randomMealsImages)

        this.randomMeals= this.randomMealsResult.recipes.map((recipe:any)=> recipe)
        console.log(this.randomMeals)
      // Making an object for better readability/deconstruction
    
    })


    this.service.getUsers().then((res) => {
      this.results = res
      console.log(this.results)
    })
  }

}
