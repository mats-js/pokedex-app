// create a new variable pokemonRepository and assign the IIFE to it
let pokemonRepository = (function() {
    // define an empty list of pokemon in the array pokemonList and the URL for the API in apiUrl
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // define separate function getAll()
    function getAll() {
        return pokemonList;
    }

    // define separate function add(item)
    function add(item) {
        // check if the item to add is of the type 'object'
        if (typeof item !== 'object') {
            alert('New pokemon must be entered as an object');
        // check if item keys are equal to the specific keys expected
        } else if (!('name' in item) || !('detailsUrl' in item)) {
            alert('New pokemon must be entered with item keys name and detailsUrl');
        // else, add item to pokemonList
        } else {
            pokemonList.push(item);
        }
    }

    // define separate function addListItem()
    function addListItem(pokemon) {
        // assign the overall list of pokemon to a new variable
        let listContainer = document.querySelector('.pokemon-list');
        // create a new list entry and button for the pokemon
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        // change the button text to the respective pokemon name
        button.innerText = pokemon.name;
        // add the class 'list-button' to the button
        button.classList.add('list-button');
        // append the button to the list item, and then the list item to the list
        listItem.appendChild(button);
        listContainer.appendChild(listItem);
        // add an event handler that calls the function showDetails(pokemon)
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // define separate function loadList() that fetches the list of pokemon from the pokeapi
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json(); // return a promise with the json() function
        }).then(function (json) {
            /* for each result from the fetched json, the result/pokemon is added 
               to pokemonList with the already implemented add function */
            json.results.forEach(function (item) {
                let pokemon = {
                name: item.name,
                detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // define separate function loadDetails() that loads details for the selected pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // define separate function showDetails() that prints the received pokemon details to the console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    // return object with the new public functions assigned as keys
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // now the data is loaded
    pokemonRepository.getAll().forEach(function(pokemon){
          pokemonRepository.addListItem(pokemon);
    });
});
