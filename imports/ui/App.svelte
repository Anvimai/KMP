<script>
    import { Meteor } from "meteor/meteor";
    import { BlazeTemplate } from "meteor/svelte:blaze-integration";
    import { useTracker } from "meteor/rdb:svelte-meteor-data";
    import { Infos } from "../api/user-info.js";
    import Info from "./Info.svelte";
    import { onMount } from "svelte";
    const cocktailDB = require("../../public/searchHelper.js");


    let newFav = "";
    let currentUser;
    onMount(async () => {
        Meteor.subscribe("info");
    });
    $: info = useTracker(() =>
        Infos.find({}, { sort: { createdAt: -1 } }).fetch()
    );
    $: currentUser = useTracker(() => Meteor.user());
    function handleSubmit(event) {
        Meteor.call("info.insert", newFav);
        // Clear form
        newFav = "";
    }

    let pageType = "init";
    let response;

    const ingredientSearchClick = function(event){
        let searchString = document.getElementById('drink-name-input').value.trim();
        response = cocktailDB.fetchResultsByIngredient(searchString);
        pageType = 'results';
    }

    const resultClick = function(event){
        let drinkName = event.target.innerText;
        document.getElementById('drink-name-input').value = drinkName;
        pageType = "drink";
        loadDrink();
    }

</script>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--Myers Reset Link-->
    <!-- <link rel="stylesheet" type="text/css" media="screen" href="assets/css/reset.css"/> -->
    <!--CSS/Bootstrap linking-->

    <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet"> 
    <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossorigin="anonymous" />
    <!-- Custom styles for this template -->
    <link ref="/main.css" rel="stylesheet" />
    <link href="/favicon.png" rel="icon" type="image/png"/>
    <title>Quarantinis</title>
</head>

<body>
    <main>
        <!-- Desktop Navbar -->

        <div id="desktop-navbar">
            <nav class="navbar navbar-dark bg-dark">
                <img
                    src="newLogo.svg"
                    alt="Git-Lit cocktail Logo"
                    class="logo"
                    style="height: 100%;" />

                <div>
                    <input
                        class="form-control typeahead"
                        id="drink-name-input"
                        placeholder="What are you drinking?"
                        type="text" />
                    <button
                        class="btn btn-secondary btn-lg"
                        id="add-drink-choices-btn">Search by Cocktail</button>
                    <button
                        class="btn btn-secondary btn-lg"
                        id="add-ingredient-choices-btn"
                        on:click={e => ingredientSearchClick(e)}>Search by Ingredient
                        </button>
                    <button
                        class="btn btn-secondary btn-lg"
                        id="add-random-drink-btn"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Not sure? We'll recommend something good!!">Random Cocktail
                        </button>
                </div>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon" />
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <dev class="nav-link" href="about.html">
                        <BlazeTemplate template="loginButtons" />
                    </dev>
                    <a class="nav-link" href="about.html" />
                </div>
            </nav>
        </div>

        <!-- Top section -->
        <section class="top">
            <div id="top" class="container-fluid">
                <!-- Jumbotron -->
                <div class="container-fluid" id="jumbo-container">
                    <div
                        class="jumbotron"
                        style="background-color: rgb(255, 255, 255, 0.0); color: white;">
                        <h1 class="text-center">quarantinis</h1>

                        <h2 class="text-center">
                            All you need to know about the cocktail(s) you’re
                            craving!
                        </h2>
                    </div>
                    {#if $currentUser}
                        <label for="drink-name-input" style="color:white"><h5>
                                Your Favorite Cocktails:
                            </h5></label>
                    {/if}
                    {#if !$currentUser}
                        <label for="drink-name-input" style="color:white"><h5>
                                Sign in or create an account to save cocktails
                                to your favorites.
                            </h5></label>
                    {/if}
                    <table style="width:100%">
                        <tr>
                            <th>
                                {#if $currentUser}
                                    {#each $info as inf}
                                        {#if $currentUser._id == inf.owner}
                                            <Info key={inf._id} task={inf} />
                                        {/if}
                                    {/each}
                                {/if}
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
        {#if (pageType != "results")} <!--fix this part to scale****************-->
            <!-- Middle Section -->
            <section class="middle">
                <div class="container">
                    <div class="row" style="min-height: 70vh">
                        <div class="col col-lg-6">
                            {#if $currentUser}
                                <form
                                    class="new-task"
                                    on:submit|preventDefault={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Type Drink Name To Add"
                                        bind:value={newFav} />
                                </form>
                            {/if}

                            <!-- <i class="far fa-star fa-2x"></i> -->
                            <div class="drink-image"><img class="img-fluid" /></div>
                        </div>
                        <div class="col col-lg-6 cards">
                            <div class="row">
                                <div class="card-body">
                                    <h2>Recipe Instructions</h2>

                                    <div class="inst" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="card-body">
                                    <h2>Ingredients</h2>
                                    <ul id="ingredientList" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Bottom Section -->
            <section class="bottom">
                <div class="container">
                    <div class="card mb-4 p-4">
                        <div class="card-body">
                            <div class="video-message" />
                            <div class="embed-responsive embed-responsive-16by9" />
                        </div>
                    </div>
                </div>
            </section>
        {:else}
            {#await response then drinks}
                {#if drinks}
                    <ul>
                        {#each drinks as drink}
                            <li on:click="{e => resultClick(e)}">{drink.strDrink}</li>
                        {/each}
                    </ul>
                {:else}
                    <p>We're sorry, but nothing in our database contains that ingredient. Try again?</p>
                {/if}
            {/await}
        {/if}
    </main>
    <footer class="footer bg-dark">
    
    </footer>
    <script
        src="https://code.jquery.com/jquery-3.3.1.js"
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
        crossorigin="anonymous">
    </script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous">
    </script>
    <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous">
    </script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.3.1/bloodhound.min.js"
        type="text/javascript">
    </script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.3.1/typeahead.jquery.min.js">
    </script>
    <script src="api.js">
    </script>
</body>