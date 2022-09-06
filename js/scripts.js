// create a new variable pokemonRepository and assign the IIFE to it
let pokemonRepository = (function() {
    // define a list of pokemon in the array pokemonList
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        { name: 'Charmander', height: 0.6, types: ['fire']},
        { name: 'Squirtle', height: 0.5, types: ['water']}
    ];

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
        } else if (!('name' in item) || !('height' in item) || !('types' in item)) {
            alert('New pokemon must be entered with item keys name, height, and types');
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
 
    // define separate function showDetails() that prints the received pokemon object to the console
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    // return object with the new public functions assigned as keys
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})()

// forEach loop to iterate over each pokemon in pokemonList
pokemonRepository.getAll().forEach( function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
