// define a list of pokemon in the array pokemonList
let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    { name: 'Charmander', height: 0.6, types: ['fire']},
    { name: 'Squirtle', height: 0.5, types: ['water']}
];

// define threshold for pokemon height (specifically chosen so that only one pokemon reaches the threshold)
let heightBig = 0.7;

// for loop to iterate over each item in pokemonList
for (i = 0; i < pokemonList.length; i++) {
    // if height of pokemon is equal to or greater than the height threshold, label pokemon as 'Wow, that's big'
    if (pokemonList[i].height >= heightBig) {
        document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}m) - Wow, that's big!</li>`);
    } else {
        document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}m)</li>`);
    }
}
