







$("#button-Area").on("click", function () {
    hideall();
    listallarea();
    closenav();
});





async function listallarea() {
    let maincontainer = [];

    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const result = await response.json();
    console.log(result);
    for (let i = 0; i < result.meals.length; i++) {
        maincontainer += `<div class="col-md-3" data-area="${result.meals[i].strArea}" id="area${i}">
                <div  class="rounded-2 text-center cursor-pointer">
                        <i class=" fa-solid color-white fa-house-laptop fa-4x"></i>
                        <h3 class="color-white">${result.meals[i].strArea}</h3>
                </div>
        </div>`;
    }

    $(".areax").html(maincontainer);
    $(".side-nav-menu").removeClass("d-none");
    $(".loading-screen").addClass("d-none");
    $("#area").removeClass("d-none");

    for (let i = 0; i < result.meals.length; i++) {
        let x = document.getElementById(`area${i}`);
        x.addEventListener("click", function (e) {
            console.log("hello");
            showbyarea(x.getAttribute("data-area"));
        })
    }
       
}
    

async function showbyarea(area){
    let maincontainer = [];
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const result = await response.json();
    for (let i = 0; i < 20; i++) {
        if (result.meals[i] != null) {
            console.log(result.meals[i])
            maincontainer += `<div class="col-md-3" data-id="${result.meals[i].idMeal}" id="cardx${i}">
                <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${result.meals[i].strMealThumb} alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${result.meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>`

            hideall();
            $(".categsearchx").html(maincontainer)
            $("#categsearch").removeClass("d-none")
            for (let i = 0; i < result.meals.length; i++) {
                if (result.meals[i] != null) {
                    let x = document.getElementById(`cardx${i}`);
                    console.log(x);
                    if (x != null) {
                        x.addEventListener("click", function (e) {
                            showbyid(x.getAttribute("data-id"));
                        })
                    }
                }
            }
        }
    }
    $(".loading-screen").addClass("d-none");



}





$("#button-Ingredients").on("click", function () {
    hideall();
    listallingredients();
    closenav();
});


async function listallingredients() {
    let maincontainer = [];

    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const result = await response.json();
    console.log(result);
    
    for (let i = 0; i < 20; i++) {
        maincontainer += `<div class="col-md-3" id="${result.meals[i].idIngredient}" data-ingrendient="${result.meals[i].strIngredient}">
                <div  class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid color-white fa-drumstick-bite fa-4x"></i>
                        <h3 class="color-white">${result.meals[i].strIngredient}</h3>
                        <p class="color-white">${result.meals[i].strDescription.slice(0,109)}</p>
                </div>
        </div>`;
    }

    $(".ingredientsx").html(maincontainer);
    $(".side-nav-menu").removeClass("d-none");
    $(".loading-screen").addClass("d-none");
    $("#Ingredients").removeClass("d-none");

    for (let i = 0; i < 20; i++) {
        let x = document.getElementById(`${result.meals[i].idIngredient}`);
        x.addEventListener("click", function (e) {
          
            showbyingredient(x.getAttribute("data-ingrendient"));
        })
    }
      
}


async function showbyingredient(ingredient){
    let maincontainer = [];
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    console.log(response)
    const result = await response.json();
    console.log(result)
    
    for (let i = 0; i < 20; i++) {
        if (result.meals[i] != null) {
            console.log(result.meals[i])
            maincontainer += `<div class="col-md-3" data-id="${result.meals[i].idMeal}" id="cardx${i}">
                <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${result.meals[i].strMealThumb} alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${result.meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>`

            hideall();
            $(".categsearchx").html(maincontainer)
            $("#categsearch").removeClass("d-none")
            for (let i = 0; i < result.meals.length; i++) {
                if (result.meals[i] != null) {
                    let x = document.getElementById(`cardx${i}`);
                    console.log(x);
                    if (x != null) {
                        x.addEventListener("click", function (e) {
                            showbyid(x.getAttribute("data-id"));
                        })
                    }
                }
            }
        }
    }
    $(".loading-screen").addClass("d-none");
}


































async function showbyid(id) {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    let tagscotainer = [];
    let recipe = "";
    let alltags = [];
    for (let i = 1; i <= 20; i++) {
        if (result["meals"]["0"][`strIngredient${i}`] == "") {
            break;
        }
        else {
            recipe += `
                <li class="alert alert-info m-2 p-1">${result["meals"]["0"][`strMeasure${i}`]
                } ${result["meals"]["0"][`strIngredient${i}`]}</li>
            `
        }
    }

    if (result["meals"]["0"]["strTags"] != null) {
        alltags = result["meals"]["0"]["strTags"].split(',');
    }

    for (i = 0; i < alltags.length; i++) {
        tagscotainer += `<li class="alert alert-danger m-2 p-1 ">${alltags[i]}</li>`
    }
    $(".details").html(`
                        <div class="row py-5 g-4 " id="rowData">
                <div class="col-md-4">
                            <img class="w-100 rounded-3" src=${result.meals[0].strMealThumb} alt="">
                                <h2 class="color-white">${result.meals[0].strMeal}</h2>
                        </div>
                        <div class="col-md-8">
                            <h2 class="color-white">Instructions</h2>
                            <p class="color-white">${result.meals[0].strInstructions}</p>
                            <h3 class="color-white"><span class="fw-bolder color-white">Area : </span>${result.meals[0].strArea}</h3>
                            <h3 class="color-white"><span class="fw-bolder color-white">Category : </span>${result.meals[0].strCategory}</h3>
                            <h3 class="color-white">Recipes :</h3>
                            <ul class="list-unstyled d-flex g-3 flex-wrap">
                                ${recipe}
                            </ul>
                
                            <h3 class="color-white">Tags :</h3>
                            <ul class="list-unstyled d-flex g-3 flex-wrap">${tagscotainer}</ul>
                
                            <a target="_blank" href="${result.meals[0].strSource}" class="btn btn-success">Source</a>
                            <a target="_blank" href="${result.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
                        </div></div>
            `)
    hideall();
    $(".loading-screen").addClass("d-none");
    closenav();
    $(".show-details").removeClass("d-none");
    $(".details").removeClass("d-none");
}



async function showbycateg(categ) {
    let maincontainer = [];
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`);
    const result = await response.json();
    for (let i = 0; i < 20; i++) {
        if (result.meals[i] != null) {
            console.log(result.meals[i])
            maincontainer += `<div class="col-md-3" data-id="${result.meals[i].idMeal}" id="cardx${i}">
                <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${result.meals[i].strMealThumb} alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${result.meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>`

            hideall();
            $(".categsearchx").html(maincontainer)
            $("#categsearch").removeClass("d-none")
            for (let i = 0; i < result.meals.length; i++) {
                if (result.meals[i] != null) {
                    let x = document.getElementById(`cardx${i}`);
                    console.log(x);
                    if (x != null) {
                        x.addEventListener("click", function (e) {
                            showbyid(x.getAttribute("data-id"));
                        })
                    }
                }
            }
        }
    }




    $(".loading-screen").addClass("d-none");
}






$(".searchname").on("input", function () {
    showmainbyname($(".searchname").val())

})


$(".searchletter").on("input", function () {
    showmainbyletter($(".searchletter").val())
})








async function showmainbyletter(name) {
    let maincontainer = [];

    $(".loading-screen").removeClass("d-none");
    if (name == "") {
        name = "a"
    }
    const response = await fetch(`Https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
    const result = await response.json();
    for (let i = 0; i < result.meals.length; i++) {
        maincontainer += `<div class="col-md-3" id="card${i}" data-id="${result.meals[i].idMeal}">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${result.meals[i].strMealThumb}" alt="mealimg"  >
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2" >
                    <h3>${result.meals[i].strMeal}</h3>
                </div>
            </div>
    </div>`;
    }
    $("#rowData").html(maincontainer);
    $(".side-nav-menu").removeClass("d-none");
    $(".loading-screen").addClass("d-none");
    $("#main").removeClass("d-none");
    for (let i = 0; i < result.meals.length; i++) {
        let x = document.getElementById(`card${i}`);
        x.addEventListener("click", function (e) {
            showbyid(x.getAttribute("data-id"));
        })
    }
}














async function showmainbyname(name) {
    let maincontainer = [];

    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`Https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const result = await response.json();
    for (let i = 0; i < result.meals.length; i++) {
        maincontainer += `<div class="col-md-3" id="card${i}" data-id="${result.meals[i].idMeal}">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${result.meals[i].strMealThumb}" alt="mealimg"  >
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2" >
                    <h3>${result.meals[i].strMeal}</h3>
                </div>
            </div>
    </div>`;
    }
    $("#rowData").html(maincontainer);
    $(".side-nav-menu").removeClass("d-none");
    $(".loading-screen").addClass("d-none");
    $("#main").removeClass("d-none");
    for (let i = 0; i < result.meals.length; i++) {
        let x = document.getElementById(`card${i}`);
        x.addEventListener("click", function (e) {
            showbyid(x.getAttribute("data-id"));
        })
    }
}

$("#button-Categories").on("click", function () {
    hideall();
    showcategories();
    closenav();
});




async function showcategories() {
    let maincontainer = [];

    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`Https://www.themealdb.com/api/json/v1/1/categories.php`);
    const result = await response.json();
    console.log(result);
    for (let i = 0; i < result.categories.length; i++) {
        maincontainer += `<div class="col-md-3" id=categ${i} data-categ=${result.categories[i].strCategory}>
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${result.categories[i].strCategoryThumb}" alt="" >
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${result.categories[i].strCategory}</h3>
                        <p>${result.categories[i].strCategoryDescription.substr(0, 100)}</p>
                    </div>
                </div>
        </div>`;
    }
    $(".catigoriesx").html(maincontainer);
    $(".side-nav-menu").removeClass("d-none");
    $(".loading-screen").addClass("d-none");
    $("#catigories").removeClass("d-none");

    for (let i = 0; i < result.categories.length; i++) {
        let x = document.getElementById(`categ${i}`);
        x.addEventListener("click", function (e) {
            showbycateg(x.getAttribute("data-categ"));
        })
    }
}







async function showmainbyname(name) {
    let maincontainer = [];

    $(".loading-screen").removeClass("d-none");
    const response = await fetch(`Https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const result = await response.json();
    for (let i = 0; i < result.meals.length; i++) {
        maincontainer += `<div class="col-md-3" id="card${i}" data-id="${result.meals[i].idMeal}">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${result.meals[i].strMealThumb}" alt="mealimg"  >
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2" >
                    <h3>${result.meals[i].strMeal}</h3>
                </div>
            </div>
    </div>`;
    }
    $("#rowData").html(maincontainer);
    $(".side-nav-menu").removeClass("d-none");
    $(".loading-screen").addClass("d-none");
    $("#main").removeClass("d-none");
    for (let i = 0; i < result.meals.length; i++) {
        let x = document.getElementById(`card${i}`);
        x.addEventListener("click", function (e) {
            showbyid(x.getAttribute("data-id"));
        })
    }
}









function validate(validname1, validmail1, validphone1, validpass1, validrepass1, validage1) {
    if (validname1 == 0 && validmail1 == 0 && validphone1 == 0 && validage1 == 0 && validpass1 == 0 && validrepass1 == 0) {
        $("#submitBtn").removeAttr("disabled");
    }

    else {
        $("#submitBtn").attr("disabled", "");
    }
}






function hideall() {
    $("#main").addClass("d-none");
    $("#search").addClass("d-none");
    $("#catigories").addClass("d-none");
    $("#area").addClass("d-none");
    $("#Ingredients").addClass("d-none");
    $("#contact-us").addClass("d-none");
    $(".details").addClass("d-none");
    $("#categsearch").addClass("d-none");
    $(".show-details").addClass("d-none");


}





function closenav() {
    $(".side-nav-menu").addClass("left--256")
    $(".menu-item").addClass("top-300")
    $(".icon-open").removeClass("d-none")
    $(".icon-close").addClass("d-none")
}






$(".icon-open").on("click", function () {
    $(".side-nav-menu").removeClass("left--256")
    $(".menu-item").removeClass("top-300")
    $(".icon-open").addClass("d-none")
    $(".icon-close").removeClass("d-none")
});
$(".icon-close").on("click", function () {
    closenav();
});

$("#button-search").on("click", function () {
    hideall();
    $("#search").removeClass("d-none");
    closenav();

});












$("#button-Contact-Us").on("click", function () {
    hideall();
    $("#contact-us").removeClass("d-none");
    closenav();

});





let validname = 1;
let validmail = 1;
let validphone = 1;
let validpass = 1;
let validrepass = 1;
let validage = 1;
let nameregex = /^[a-zA-Z]+$/;
let mailregex = /^\w{2,15}@\w{3,}\.\w{3,}$/;
let numregex = /^[0-9]{10,12}$/;
let ageregex = /^[0-1]?[0-9]{1}[0-9]{1}$|^[0-1]?[0-9]?[1-9]{1}$|^100?$|^200?$/;
let passregex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;


$("#nameInput").on("input", function () {
    if (nameregex.test($("#nameInput").val())) {
        $("#nameAlert").addClass("d-none")
        validname = 0;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
    else {
        $("#nameAlert").removeClass("d-none")
        validname = 1;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
})

$("#emailInput").on("input", function () {
    if (mailregex.test($("#emailInput").val())) {
        $("#emailAlert").addClass("d-none")
        validmail = 0;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
    else {
        $("#emailAlert").removeClass("d-none")
        validmail = 1;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
})

$("#phoneInput").on("input", function () {
    if (numregex.test($("#phoneInput").val())) {
        $("#phoneAlert").addClass("d-none")
        validphone = 0;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
    else {
        $("#phoneAlert").removeClass("d-none")
        validphone = 1;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
})

$("#ageInput").on("input", function () {
    if (ageregex.test($("#ageInput").val())) {
        $("#ageAlert").addClass("d-none")
        validage = 0;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
    else {
        $("#ageAlert").removeClass("d-none")
        validage = 1;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
})


$("#passwordInput").on("input", function () {
    if (passregex.test($("#passwordInput").val())) {
        $("#passwordAlert").addClass("d-none")
        validpass = 0;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
    else {
        $("#passwordAlert").removeClass("d-none")
        validpass = 1;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
})


$("#repasswordInput").on("input", function () {
    if ($("#repasswordInput").val() == $("#passwordInput").val()) {
        $("#repasswordAlert").addClass("d-none")
        validrepass = 0;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
    else {
        $("#repasswordAlert").removeClass("d-none")
        validrepass = 1;
        validate(validname, validmail, validphone, validpass, validrepass, validage);
    }
})










hideall();
showmainbyname("");
