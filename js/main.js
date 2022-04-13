//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// Create object of all drinks that will be passed from the API search: name, pictureURL and description
let allDrinks = {
    nameOfDrinks: [],
    picOfDrinks: [],
    desOfDrinks: []
};

// Create query selectors to search drink and to rotate carousel afterwards
document.querySelector("#search").addEventListener("click", grabCocktail);
document.querySelector("#next").addEventListener("click", showNextCocktail)

// Define a count for the carousel rotation so we can reset the rotation when needed
let countRotation = 0


function grabCocktail(){
    // grab value of input and save in variable, replace space with underscore for API url search
    let cocktailName = document.querySelector("input").value.split(" ").join("_")
    
    // fetch data with above variable
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(res => res.json()) //parse response as JSON
    .then(data => {

        // Get the number of drink found with the length of the array
        let numOfDrinks = data.drinks.length;
        // For each drink found, save the name, picture, and instructions
        for (let i = 0; i < numOfDrinks; i++){
            allDrinks.nameOfDrinks.push(data.drinks[i].strDrink)
            allDrinks.picOfDrinks.push(data.drinks[i].strDrinkThumb)
            allDrinks.desOfDrinks.push(data.drinks[i].strInstructions)
        }
        // Call the function to print the first cocktail in the dom
        console.log(allDrinks)
        printNameAndInstructionsInDom()

    })
    // Catch errors
    .catch(err => {
        console.log(`error ${err}`)
    });


    // print the first cocktail in the dom
    function printNameAndInstructionsInDom(){
        
        document.querySelector("h2").innerHTML = allDrinks.nameOfDrinks[0];
        document.querySelector("img").src = allDrinks.picOfDrinks[0];
        document.querySelector("h3").innerHTML = allDrinks.desOfDrinks[0];
    }
}


// Show next cocktail when button is clicked
function showNextCocktail(){
    // Reset count rotation when reached the end of the array
    if (countRotation === (allDrinks.nameOfDrinks.length -1)){
        countRotation = -1;
    }
    // Add one to the count for each new cocktail printed
    countRotation += 1;
    // show everything
    document.querySelector("h2").innerHTML = allDrinks.nameOfDrinks[countRotation];
    document.querySelector("img").src = allDrinks.picOfDrinks[countRotation];
    document.querySelector("h3").innerHTML = allDrinks.desOfDrinks[countRotation];
}