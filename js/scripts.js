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

// for (i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > 1) {
//         document.write(`${pokemonList[i].name} (${pokemonList[i].height}) - Wow, that's big! <br><br> `)
//     } else {
//         document.write(`${pokemonList[i].name} (${pokemonList[i].height}) <br><br> `)
//     }
// }


for (i = 0; i < pokemonList.length; i++) {

    pokemonList[i].height > 1 ? 
        document.write(`${pokemonList[i].name} (${pokemonList[i].height}) - Wow, that's big! <br><br> `) : 
        document.write(`${pokemonList[i].name} (${pokemonList[i].height}) <br><br> `)

}