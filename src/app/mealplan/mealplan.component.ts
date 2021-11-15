import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup,FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


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

  // User Info
  user:any;
  users: any=[];
  usersList:any=[];
  userLikes:any=[];
  userFriends:any=[];

  constructor(private service: DataService, private http: HttpClient, private fAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.isMealPlan = false
  }

  ngOnChanges(){
    console.log("test")
  }

  ngOnInit() {
    this.fAuth.authState.subscribe(user => {   
      this.user = user            
      console.log("user email",this.user.email)
      // Algorithm below fetches user friends
      this.fireStore.collection('/users/' + this.user.email.toLowerCase() + '/friends/').get().subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.userFriends.push(doc.data());
          console.log("user friends",this.userFriends)
        });
      });

      this.fireStore.collection('/users').get().subscribe((ss) => {
        ss.docs.forEach((email) => {
          this.usersList.push(email.data());
          console.log("user list",this.userFriends)
        });
      });

      // const shuffled = this.users.sort(() => 0.5 - Math.random());
      // var selected = shuffled.slice(0, 4);
      // console.log(selected)
      // console.log(this.users)


  });
    
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

  getLike(e) {
    console.log(e)
    let email = this.user.email.toLowerCase();
    let recipeTitle = e.title;

    this.fireStore.doc('/users/' + email + '/likes/' + recipeTitle)                        
              .set({
                id: e.id,
                title: e.title,
                image: e.image,
                servings: e.servings,
                spoonurl: `https://spoonacular.com/recipes/${e.title.split(' ').join('-')}-${e.id}` ,
                sourceurl: e.sourceUrl,
            });
  }

  addFriend(e) {
    let email = this.user.email.toLowerCase();
    this.fireStore.doc('/users/' + email + '/friends/' + e.email.toLowerCase())                        
              .set({
                email: e.email,
                userName: e.userName,
            });
  }


}
