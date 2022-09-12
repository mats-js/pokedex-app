// REPOSITORY FUNCTIONALITY //
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
        let listContainer = $('.list-group');
        // create a new list entry and button for the pokemon
        let listItem = $('<li class="list-group-item"></li>');
        let button = $(`<button type="button" class="btn list-group-item list-group-item-action list-group-item-light" data-toggle="modal" data-target="#exampleModal">${pokemon.name}</button>`);
        // add the class 'list-button' to the button
        button.addClass('list-button');
        // append the button to the list item, and then the list item to the list
        listItem.append(button);
        listContainer.append(listItem);
        // add an event handler that calls the function showDetails(pokemon)
        button.on('click', function () {
            showDetails(pokemon);
        });
    }

    // define separate function loadList() that fetches the list of pokemon from the pokeapi
    function loadList() {
        return $.ajax(apiUrl).then(function (json) {
            /* for each result from the fetched json, the result/pokemon is added 
               to pokemonList with the already implemented add function */
            json.results.forEach(function (item) {
                let pokemon = {
                    name: (item.name).charAt(0).toUpperCase() + (item.name).slice(1), // change name's first char to uppercase
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
        return $.ajax(url).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = [];
            for (var i = 0; i < details.types.length; i++) {
                item.types.push(details.types[i].type.name);
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    // define separate function showDetails() that prints the received pokemon details to the console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(item) {  
        // define modal body, title, and header
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        // clear existing modal title and body
        modalTitle.empty();
        modalBody.empty();

        // create elements for pokemon name, img, height, and types
        let nameElement = $(`<h1>${item.name}</h1>`);
        let imageElement = $('<img class="modal-img" />');
        imageElement.attr('src', item.imageUrl);
        let heightElement = $(`<p>Height: ${item.height}</p>`);
        let typesElement = $(`<p>Types: ${item.types}</p>`);

        // append pokemon elements to modal
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
    }

    // return object with the new public functions assigned as keys
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();

// load the pokemonRepository
pokemonRepository.loadList().then(function() {
    // now the data is loaded
    pokemonRepository.getAll().forEach(function(pokemon){
          pokemonRepository.addListItem(pokemon);
    });
});
