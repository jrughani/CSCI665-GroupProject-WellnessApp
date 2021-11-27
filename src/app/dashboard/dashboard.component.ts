import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup,FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apiKey:string="2748398f60524fc090d89b2009c9e4a1";
  // Results from get request
  searchQuery:string='';
  searchIngredients:string='';
  recipeList:any;
  recipeLinks:any=[];
  ingredients:any=[];
  user:any=[]
  userLikes:any=[];
  userTitleLikes:any=[];
  likesId:any=[];
  recipe:any=[];
  isLikes:any;
  isClicked:any;
  isSearched:any;
  
  constructor( private http: HttpClient, private fAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.isLikes = false
    this.isClicked = true
    this.isSearched = false
   }

  ngOnInit(): void {
    this.fAuth.authState.subscribe(user => {   
      this.user = user            
      console.log("user email",this.user.email)
      // Algorithm below fetches user likes
      this.fireStore.collection('/users/' + this.user.email.toLowerCase() + '/likes/').get().subscribe((ss) => {
        ss.docs.forEach((doc, i) => {
    
          this.userLikes.push(doc.data());
        this.userTitleLikes.push(this.userLikes[i].title)
          // console.log("user likes",this.userLikes)
 
        });
      });
  });
 

  }

  fireStoreTest() {
    console.log(this.user)

    let email = this.user.email.toLowerCase();

    this.fireStore.doc('/users/' + email)                        
              .update({
                email:"test@gmail.com",
                userName:"Patrick Torres",
                test3:"hi this is patrick5",     
                     
              });
  }

  setQuery(e) {
    this.searchQuery = e.innerText
    console.log(this.searchQuery)
  }

  async searchRecipe() {
    // document.getElementById("searched").style.display = "block"
    // document.getElementById("mealplan").style.display = "none"

    this.isSearched = true
    
let mealplan = document.getElementById("mealplan")
    if (this.searchIngredients.length > 0) {
mealplan.style.display = "none"
    } else mealplan.style.display = "block"
    

    let searchIngredients = this.searchIngredients.replace(",", ",+")
    console.log(  this.searchIngredients)

    return this.http.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchIngredients}&number=12&apiKey=${this.apiKey}`).toPromise().then((data) => {
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

getLike(e) {
  console.log(e)
  let email = this.user.email.toLowerCase();

  this.userLikes.push(e)
  this.userTitleLikes.push(e.title)
  console.log(this.userLikes)
  console.log(this.userTitleLikes)

  return this.http.get(`https://api.spoonacular.com/recipes/${e.id}/information?includeNutrition=false&apiKey=${this.apiKey}`).toPromise().then((data) => {
      this.recipe = data

      this.fireStore.doc('/users/' + email + '/likes/' + this.recipe.title)                        
      .set({
        id: this.recipe.id,
        title: this.recipe.title,
        image: this.recipe.image,
        servings: this.recipe.servings,
        spoonurl: `https://spoonacular.com/recipes/${this.recipe.title.split(' ').join('-')}-${this.recipe.id}` ,
        sourceurl: this.recipe.sourceUrl,
    });
    })
}

dislike(e) {
console.log(e)
this.userLikes = []
const email = this.user.email
this.userTitleLikes.splice(this.userTitleLikes.indexOf(e.title), 1);
  this.fireStore.doc('/users/' + email + '/likes/' + e.title)                        
              .delete()

              this.fireStore.collection('/users/' + this.user.email.toLowerCase() + '/likes/').get().subscribe((ss) => {
                ss.docs.forEach((doc) => {
                  this.userLikes.push(doc.data());
                  console.log("user likes",this.userLikes)
                });
              });
}

showLikes() {
  // document.getElementById("searched").style.display = "none"

  this.isSearched = false

  this.isLikes = true
  this.isClicked = false
  this.userLikes = []
  // console.log(this.userLikes)
  this.fireStore.collection('/users/' + this.user.email.toLowerCase() + '/likes/').get().subscribe((ss) => {
    ss.docs.forEach((doc) => {

      this.userLikes.push(doc.data());
    
      // console.log("user likes",this.userLikes)

    });
  });
}

showHome() {
  // document.getElementById("searched").style.display = "none"
  this.isSearched = false

  this.isLikes = false
  this.isClicked = true
}
  
}
