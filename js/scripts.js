let pokemonRepository = (function () {
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


    function add(pokemon) {

        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon)
        } else {
            document.write(`${pokemon} is not an object. Only object is accepted <br><br><br>`)
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }

})();

pokemonRepository.add({ name: 'Pikachu', height: '0.4', type: ['electric'] })

let allPokemons = pokemonRepository.getAll()

allPokemons.forEach(pokemon => {

    pokemonRepository.addListItem(pokemon)


    // document.write(`${pokemon.name} (${pokemon.height}) <br><br> `)
})
