////////////////////////nav//////////////////////////////

var nav = document.querySelector(".open-close-icon")
var x = document.querySelector(".nav")
var nav_links = document.querySelectorAll(".links li")
function closeSideNav(){
    nav_links.forEach(li => {
        let currentTop = parseInt(window.getComputedStyle(li).top) || 0;
        li.style.top = (currentTop + 300) + 'px';
    });
    x.style.left =  -250 + 'px';
    document.querySelector(".open-close-icon").classList.remove("fa-align-justify");
    document.querySelector(".open-close-icon").classList.add("fa-x");

}
function openSideNav() {
    
    nav_links.forEach((li, index) => {
        li.style.transition = "top 0.5s";
        setTimeout(() => {
            li.style.top = "0";
        }, (index + 5) * 100); 
    });
      nav_links.forEach(li => {
        x.style.left = 0 + 'px';
    });
    document.querySelector(".open-close-icon").classList.add("fa-align-justify");
    document.querySelector(".open-close-icon").classList.remove("fa-x");

}

nav.addEventListener('click',function(){
    console.log("hallloooooooo");
    
    const firstLi = document.querySelector(".links li");
    const topValue = window.getComputedStyle(firstLi).top;

    if(topValue === "0px"){
        closeSideNav()
    }
    else{
        openSideNav()
    }
})


closeSideNav()

///////////////////////////ApearLoadding///////////////////////////
async function ApearLoadding() {
    document.querySelector(".inner-loading-screen").style.transition = "opacity 0.3s";
    document.querySelector(".inner-loading-screen").style.opacity = 5;

    setTimeout(() => {
        document.querySelector(".inner-loading-screen").style.display = "flex";
    }, 300);
}
 ApearLoadding()
//////////////////////////DisapearLoading//////////////////////////
async function DisapearLoading() {
     document.querySelector(".inner-loading-screen").style.transition = "opacity 0.3s";
    document.querySelector(".inner-loading-screen").style.opacity = 0;

    setTimeout(() => {
        document.querySelector(".inner-loading-screen").style.display = "none";
    }, 300)
}
////////////////////////////firstLoad//////////////////////////////

var rowdata = document.getElementById("row-data")
var searchContainer = document.getElementById("searchContainer")

async function onLoad(){
    let s = ' '
    let reponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+s)
    reponse = await reponse.json()
    document.querySelector(".inner-loading-screen").style.transition = "opacity 0.3s";
    document.querySelector(".inner-loading-screen").style.opacity = 0;

    setTimeout(() => {
        document.querySelector(".inner-loading-screen").style.display = "none";
    }, 300);
    displayMeals(reponse.meals.slice(0,20))
    
} 
onLoad()
////////////////////////////categories//////////////////////////////

async function getCategories() {
    searchContainer.innerHTML =''
    ApearLoadding()
    var response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    response = await response.json()
    console.log(response.categories)
    displayCategories(response.categories)
    DisapearLoading()
}
 
function displayCategories(data){
    rowdata.innerHTML = ''
    cartona = ''
    for(var i =0;i<data.length;i++){
        cartona +=`
             <div class="col-md-3">
                     <div onclick="getCategoryMeal('${data[i].strCategory}')" class="cat position-relative overflow-hidden cursor-pointer rounded-2 p-2">
                        <img src="${data[i].strCategoryThumb}" alt="" class="w-100">
                        <div class="cat-layer position-absolute text-center p-2">
                            <h3>${data[i].strCategory}</h3>
                            <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                     </div>
                </div>
        `
    }
    rowdata.innerHTML = cartona
}
1231

async function getCategoryMeal(category) {
    ApearLoadding()
    var response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category)
    response = await response.json()
    console.log(response)
    displayMeals(response.meals)
    DisapearLoading()
}

function displayMeals(data){
    searchContainer.innerHTML =''
    rowdata.innerHTML = ''
    cartona = ''
    for(var i =0;i<data.length;i++){
        cartona +=`
             <div class="col-md-3">
                     <div onclick="getMealDetails(${data[i].idMeal})" class="cat position-relative overflow-hidden cursor-pointer rounded-2 p-2">
                        <img src="${data[i].strMealThumb}" alt="" class="w-100">
                        <div class="cat-layer position-absolute d-flex align-items-center p-2">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                     </div>
                </div>
        `
    }
    rowdata.innerHTML = cartona
}

async function getMealDetails(id){
    ApearLoadding()
    var response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    response = await response.json()
    console.log(response.meals)
    displayMealDetails(response.meals[0])
    DisapearLoading()
}

function displayMealDetails(data){
    let ingredients =''
    for(let i =0;i<=15;i++){
        if(data[`strIngredient${i}`])
           ingredients += `<div class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</div>`

    }
    let Tags
    if(data['strTags'] != ''){
        Tags = data['strTags'].split(",")
    }
    else{
         Tags = []
    }
    let strTags = ""
    for(let i =0;i<Tags.length;i++){
        strTags += `<div class="alert alert-danger m-2 p-1">${Tags[i]}</div>`
    }
    searchContainer.innerHTML =''
    rowdata.innerHTML = ''
    cartona = ''
   
        cartona +=`
               <div class="col-md-4 text-white">
                      <img src="${data.strMealThumb}" alt="" class="rounded-2 w-100">
                      <h2>${data.strMeal}</h2>
                </div>   
                <div class="col-md-8 text-white">
                      <h2>Instructions</h2>
                      <p>${data.strInstructions}</p>
                      <h3>Area: ${data.strArea}</h3>
                      <h3>Category: ${data.strCategory}</h3>
                      <h3>Recipes :</h3>
                      <div class="d-flex flex-wrap">
                          ${ingredients}
                      </div>
                      <h3>Tags: </h3>
                      <div class="d-flex flex-wrap">
                          ${strTags}
                      </div>
                      <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                      <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
            </div> 
        `
    
    rowdata.innerHTML = cartona
}
////////////////////////////Areas//////////////////////////////
async function getAreas(){
    ApearLoadding()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    response = await response.json()
    displayAreas(response.meals)
    DisapearLoading()
}

function displayAreas(data){
    searchContainer.innerHTML =''
    rowdata.innerHTML = ''
    cartona = ''
    for(var i =0;i<data.length;i++){
        cartona +=`
             <div class="col-md-3">
                    <div onclick="getAreaMeal('${data[i].strArea}')" class="text-center cursor-pointer text-light">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <p>${data[i].strArea}</p>
                    </div>
                    
                </div>
        `
    }
    rowdata.innerHTML = cartona
}

async function getAreaMeal(area){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a='+area)
    response = await response.json()
    displayMeals(response.meals.slice(0,20))
    DisapearLoading()
}

///////////////////////////////Search/////////////////////////////////////
async function getSearchName(name){
    ApearLoadding()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+name)
    response = await response.json()
    console.log(response)
    displaySearch(response.meals)
    DisapearLoading()
}

async function getSearchFirst(f){
    ApearLoadding()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f='+f)
    response = await response.json()
    console.log(response)
    displaySearch(response.meals)
    DisapearLoading()
}

function displaySearch(data){
    rowdata.innerHTML = ''
    cartona = ''
    for(var i =0;i<data.length;i++){
        cartona +=`
          <div class="col-md-3">
                    <div onclick="getMealDetails(${data[i].idMeal})" class="cat position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="cat-layer position-absolute d-flex align-items-center p-2">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    rowdata.innerHTML = cartona
}
function showSearchInputs(){
     searchContainer.innerHTML = `
          <div class="col-md-6">
                <input onkeyup="getSearchName(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="getSearchFirst(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
            </div>
     `

    rowdata.innerHTML = ''

}

///////////////////////////////ingrediants/////////////////////////////////////
async function getIngrediants(){
    ApearLoadding()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    response = await response.json()
    displayIngrediants(response.meals.slice(0,20))
    DisapearLoading()
}

function displayIngrediants(data){
    searchContainer.innerHTML =''
    rowdata.innerHTML = ''
    cartona = ''
    for(var i =0;i<data.length;i++){
        cartona +=`
           <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="cursor-pointer text-center text-white">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${data[i].strIngredient}</h3>
                    <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>    
        `
    }
    rowdata.innerHTML = cartona
}

async function getIngredientsMeals(ingred){
    searchContainer.innerHTML =''
    ApearLoadding()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+ ingred)
    response = await response.json()
    console.log(response.meals)
    displayMeals(response.meals.slice(0,20))
    DisapearLoading()
}

////////////////////////////Contact///////////////////////////////
function getContact(){
    searchContainer.innerHTML =''
    rowdata.innerHTML = ''
    rowdata.innerHTML = `
           <div class="container w-75 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input id="nameInput" type="text" onkeyup="inputValidation()" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="emailInput" type="text" onkeyup="inputValidation()" class="form-control" placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger mt-2 d-none">
                                Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="phoneInput" type="text" onkeyup="inputValidation()" class="form-control" placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="ageInput" type="number" onkeyup="inputValidation()" class="form-control" placeholder="Enter Your Age">
                            <div id="ageAlert" class="alert alert-danger mt-2 d-none">
                                Enter valid age
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="passwordInput" type="password" onkeyup="inputValidation()" class="form-control" placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger mt-2 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="repasswordInput" type="password" onkeyup="inputValidation()" class="form-control" placeholder="Repassword">
                            <div id="repasswordAlert" class="alert alert-danger mt-2 d-none">
                                Enter valid repassword 
                            </div>
                        </div>
                    </div>  
                    <button id="submitBtn" disabled="true" class="btn btn-outline-danger mt-3">Submit</button>
                </div>
     `

    
}

function inputValidation(){
    if(nameValidation())
        document.getElementById("nameAlert").classList.replace('d-block','d-none')
    else
        document.getElementById("nameAlert").classList.replace('d-none','d-block')
   //////////////////////////////
    if (ageValidation()) 
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    else 
        document.getElementById("ageAlert").classList.replace("d-none", "d-block")
   //////////////////////////////
    if (emailValidation()) 
        document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    else 
        document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    //////////////////////////////
    if (phoneValidation()) 
        document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    else 
       document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    /////////////////////////////
    if (passwordValidation()) 
        document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    else
        document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    //////////////////////////////
    if (repasswordValidation())
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    else
        document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

     if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }

}
function nameValidation(){
   let name = document.getElementById("nameInput").value 
   let flag  = /^[a-zA-Z ]+$/.test(name); 
   return flag

}
function ageValidation(){
   let age = document.getElementById("ageInput").value 
   let flag  = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(age); 
   return flag
}
function emailValidation(){
   let email = document.getElementById("emailInput").value
   let flag  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email); 
   return flag
}
function phoneValidation(){
   let phone = document.getElementById("phoneInput").value
   let flag  = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone); 
   return flag
}
function passwordValidation(){
   let password = document.getElementById("passwordInput").value 
   let flag  = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(password); 
   return flag
}
function repasswordValidation(){

   let re = document.getElementById("repasswordInput").value
   let pass  = document.getElementById("passwordInput").value
    if (re == pass)
        return true
    else
        return false
}