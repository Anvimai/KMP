const axios = require("axios");

/*export const fetchResultsByIngredient = async function(searchString){
    let cocktailDBURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchString;
  
  //Response from Cocktail DB
    
    let response = await $.ajax({
      url: cocktailDBURL,
      method: "GET"
    }).done((response) => {
      return response["drinks"];
    }).fail(() => {
      console.log("Request Failed");
    });

    return response;
}*/
export const fetchResultsByIngredient = async function(searchString){
  let cocktailDBURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchString;
  let response = await axios({
    method: "GET", 
    url: cocktailDBURL
  })

  return response.data.drinks;
}