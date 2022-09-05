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
        pokemonList.push(item);
    }

    // return object with the new public functions assigned as keys
    return {
        getAll: getAll,
        add: add
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
