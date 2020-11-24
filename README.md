# Meteor, User Accounts, MongoDB

This application uses the Meteor framework. This framework was chosen for its easy to implement user accounts features, its backend database, MongoDB, its compatibility with svelte components, and its well established documentation.

Meteor adheres to a strict separation of concerns. Files are separated into folders;

client
    main.js - calls meteor components from imports at start up and injects into the view
    main.css - styling
    main.html - view
server
    main.js - allows the server side to handle user-info (for publishing)
imports
    ui
        App.svelte - main app components, akin to a controller for dynamic view components.
        Info.svelte - main user app components, controller for user specific data/interaction.
    api
        user-info.js -  creates a collection with MongoDB to store additional user information (i.e. favorites list). Controls insertion and deletion of
                        favorites. Applies security to restrict who can view/modify favorites. Calls update on user-info collection.
    startup
        accounts-config.js - configures user accounts signup/signin process. Ours requires that a user registers only a username and password.   
public
    api.js - backend Twitter/YouTube/CocktailsDB api connection and controller.
    image.jpg - images for styling


# CocktailDb Api, YouTube Api, Twitter Api
## CocktailDB API ##

In order to get the information we needed for cocktails, we used the cocktailDB API which allows us to query cocktail recipes by the name or by ingredients.

This was done using ajax to query a specific cocktailDB URL, as well as jquery to update the html and render the appropriate information.

1. The cocktail name first is grabbed from the input field
2. Which is then concatenated at the end of "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" as a search parameter.
3. This URL is then used in an ajax get method to return a response containing the cocktail recipe.
4. html is created using jquery to add the following elements and insert the correct information given the response:
    1. an image tag
    2. a cocktail name header
    3. and a favorite star
5. All the html elements are then appended to the html page.
6. Ingredients and measurements are then stored in arrays.
    1. These arrays are looped through to check if values exist for each
    2. if values are present then list items are created and appended to the list according to whether or not an ingredient and a measure for that ingredient exists, or just an ingredient.
7. Lastly, the instructions to create the cocktail are done in a similar fashion, using jquery to create the html element and then appending it to the appropriate div.

## Youtube API ##

Youtube provides an API for searching for youtube videos through Google, which is what we used to find youtube tutorials relevant to the cocktail search.

Much like the process for using the CocktailDB API, we used ajax to query the youtube API and then render the appropriate html to display the video.

1. Once again the cocktail name is grabbed from the input field
2. Which is concatenated within the https://www.googleapis.com/youtube/v3/search?q= URL, along with other parameters.
    1. The Youtube API provides many parameters to add to your query, but we only used
        1. part=snippet (we just want a snippet or overview of the video details without specifics into processing, recording, statistics, etc.)
        2. channelID (we chose a specific youtube channel to query because there is no way to filter all search results for only drink tutorials. Some results might include the cocktail name in the title but be completely unrelated.)
        3. type=video (do not need playlists or channels, etc)
        4. order=relevance (we want the most relevant video to the cocktail name
        5. videoEmbeddable (Since we are displaying the video on our website we must make sure it is embeddable)
3. A GET request is sent using ajax, after which the response is stored and checked to see if it contains videos.
4. If there are no videos matching the cocktail name, we build the html for an iframe and make the src a URL for a default cocktail mixing 101 tutorial, which is then appended to the correct div
5. If there is a video and the cocktail name is included in the title (sometimes videos would be returned for different drinks), then we capture the video ID from the response, build a URL with that ID and then the same process as above regarding the iframe and appending.

The random search is done in the same way, but instead of building a URL with the cocktail name for the cocktailDB, https://www.thecocktaildb.com/api/json/v1/1/random.php is used to receive a random drink. This random drink name is then passed into the Youtube API call to search for its video.

## Twitter's typeahead ##

The autocomplete feature for this website was created by implementing Twitter's typeahead.js. A link to their documentation: https://github.com/twitter/typeahead.js

An instance of Bloodhound, Twitter's suggestion engine, was created and cocktail names as well as ingredients were stored locally for it. The UI was then initialized on our input field and the instance of Bloodhound was passed in as the source.
# Svelte, Heroku

We chose Svelte to do our dynamic HTML generation. Meteor is configured to run the Svelte compiler on the appropriate files which come out as pure Javascript for the browser. Info.svelte defines a new HTML tag to display items fetched from our database, while App.svelte contains and handles almost all of the UI (save for some JQuery in our CocktailDB API handling script) and is the meeting place of all the different incorporated scripts and packages.

Heroku is our hosting platform. We use the meteor-horse buildpack to make everything executable by node.js and MongoDB Atlas to provide our MongoDB instance.
