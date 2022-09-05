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
        // check if the item to add is of the type 'object' (Bonus Task)
        if (typeof item !== 'object') {
            alert('New pokemon must be entered as an object');
        // check if item keys are equal to the specific keys expected (Bonus Task)
        } else if (Object.keys(item) !== ['name', 'height', 'types']) {
            alert('New pokemon must be entered with item keys name, height, and types');
        // else, add item to pokemonList
        } else {
            pokemonList.push(item);
        }
    }

    // define separate function findPokemon() (Bonus Task)
    function findPokemon(pokemonName) {
        return pokemonList.filter(list => list.name === pokemonName);
    }
 
    // return object with the new public functions assigned as keys
    return {
        getAll: getAll,
        add: add,
        findPokemon: findPokemon
    }
})()

// define threshold for pokemon height (specifically chosen so that only one pokemon reaches the threshold)
let heightBig = 0.7;

// forEach loop to iterate over each pokemon in pokemonList
pokemonRepository.getAll().forEach( function(pokemon) {
    // if height of pokemon is equal to or greater than the height threshold, label pokemon as 'Wow, that's big'
    if (pokemon.height >= heightBig) {
        document.write(`<li>${pokemon.name} (height: ${pokemon.height}m) - Wow, that's big!</li>`);
    } else {
        document.write(`<li>${pokemon.name} (height: ${pokemon.height}m)</li>`);
    }
});
