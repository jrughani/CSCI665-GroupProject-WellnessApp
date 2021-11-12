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

  apiKey:string="f54682d328d44737904ba650a1de23e4";
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

  // Mealplan
  isMealPlan:any;
  mealPlan:any;
  mealList:any;
  mealPlanNutrients:any;
  mealPlanInfo: any=[];

  constructor(private service: DataService, private http: HttpClient) {
    this.isMealPlan = false
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
    return this.http.get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=${this.timeFrame}?targetCalories=${this.calorieGoal}?diet=${this.dietPlan}?exclude=${this.allergens}&apiKey=${this.apiKey}`).toPromise().then((data) => {
    this.mealPlan=data
    this.mealPlanNutrients = this.mealPlan.nutrients
    console.log(this.mealPlanNutrients)
    this.mealList = this.mealPlan.meals.map((recipe:any)=> recipe.id)

    console.log(this.mealList)
    this.getMealPlanInfo(this.mealList)
    
    })
  }

  async getMealPlanInfo(mealPlan) {
    console.log(mealPlan)
    this.isMealPlan = true;
    return mealPlan.map((meal:any) => 
    this.http.get(`https://api.spoonacular.com/recipes/${meal}/information?includeNutrition=true&apiKey=${this.apiKey}`).toPromise().then((data) => {
    this.mealPlanInfo.push(data)
    console.log(this.mealPlanInfo)
  }))

  //  var test = this.mealPlanInfo.map((recipe:any)=> recipe.aggregateLikes)
  //  console.log(test)

  }

  closeMealPlan() {
    this.isMealPlan = false;
    this.mealPlanInfo = []
  }

  getLike() {
    console.log("test")
  }

}
