import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealplanComponent implements OnInit {

  // Results from get request
  results: any;
  // Meal json
  randomMealsResult: any;
  randomMealsImages: any;
  randomMealsTitle: any;
  randomMealsServing: any;
  randomMeals:any;
  
  // Mealplan parameters
  calorieGoal:any;
  dietPlan:any;
  allergens:any;
  timeFrame:string="week";


  constructor(private service: DataService, private http: HttpClient) {
   
  }

  ngOnChanges(){
    console.log("test")
  }

  ngOnInit() {
    
    console.log(this.timeFrame)

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

  setTimeFrame(e): void {
    this.timeFrame = e.innerText.toString()
    console.log(this.timeFrame)
  }

  getMealPlan(): void {
    console.log(this.timeFrame)
    console.log(this.calorieGoal)
    console.log(this.dietPlan)
    console.log(this.allergens)
    this.generateMealPlan()
  }


  generateMealPlan() {
    return this.http.get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=${this.timeFrame}?targetCalories=${this.calorieGoal}?diet=${this.dietPlan}?exclude=${this.allergens}&apiKey=3648a4ecfed843ffbf5d22382057b7a6`).toPromise().then((data) => {
    console.log(data)  
    return data
    })
  }



}
