let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


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

        button.addEventListener('click', function(){
            showDetails(pokemon)
        })        
    }

    function showDetails(pokemon){
        console.log(pokemon.name)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    }

})();

pokemonRepository.add({ name: 'Pikachu', height: '0.4', type: ['electric'] })

let allPokemons = pokemonRepository.getAll()

allPokemons.forEach(pokemon => {

    pokemonRepository.addListItem(pokemon)


    // document.write(`${pokemon.name} (${pokemon.height}) <br><br> `)
})
