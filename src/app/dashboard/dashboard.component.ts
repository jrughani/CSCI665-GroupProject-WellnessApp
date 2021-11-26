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
  apiKey:string="3648a4ecfed843ffbf5d22382057b7a6";
  // Results from get request
  searchQuery:string='';
  searchIngredients:string='';
  recipeList:any;
  recipeLinks:any=[];
  ingredients:any=[];
  user:any=[]
  userLikes:any=[];
  likesId:any=[];
  recipe:any=[];
  
  constructor( private http: HttpClient, private fAuth: AngularFireAuth, private fireStore: AngularFirestore) { }

  ngOnInit(): void {
    this.fAuth.authState.subscribe(user => {   
      this.user = user            
      console.log("user email",this.user.email)
      // Algorithm below fetches user likes
      this.fireStore.collection('/users/' + this.user.email.toLowerCase() + '/likes/').get().subscribe((ss) => {
        ss.docs.forEach((doc) => {
    
          this.userLikes.push(doc.data());
        
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

getLike(e) {
  console.log(e)
  let email = this.user.email.toLowerCase();

  

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
  this.fireStore.doc('/users/' + email + '/likes/' + e.title)                        
              .delete()

              this.fireStore.collection('/users/' + this.user.email.toLowerCase() + '/likes/').get().subscribe((ss) => {
                ss.docs.forEach((doc) => {
                  this.userLikes.push(doc.data());
                  console.log("user likes",this.userLikes)
                });
              });
}
  
}
