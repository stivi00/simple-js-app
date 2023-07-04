// let pokemonRepository = (function () {
//     let pokemonList = [];

//     function add(pokemon){
//         pokemonList.push(pokemon)
//     }

//     function getAll() {
//         return pokemonList;
//     }

//     return {
//         add: add,
//         getAll: getAll
//     }

// })();

let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        types: ['grass', 'poison']
    },
    {
        name: 'Charizard',
        height: 1.7,
        types: ['fire', 'flying']
    },
    {
        name: 'Squirtle',
        height: 0.5,
        types: ['water']
    },
    {
        name: 'Onix',
        height: 8.8,
        types: ['rock', 'ground']
    }
];

pokemonList.forEach(pokemon => {
    document.write(pokemon.name) + document.write(pokemon.height) 

})