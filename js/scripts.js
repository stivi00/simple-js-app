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

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {

                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e)
        })
    }


    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {


            let modalContainer = document.querySelector('#modal-container');
            modalContainer.classList.add('is-visible');

            modalContainer.innerHTML = '';

            //modal content goes here
            let modal = document.createElement('div');
            modal.classList.add('modal');

            let pokemonName = document.createElement('h1');
            pokemonName.innerText = pokemon.name;

            let closeModal = document.createElement('button');
            closeModal.classList.add('modal-close');
            closeModal.innerText = 'Close';

            let pokemonImage = document.createElement('img');
            pokemonImage.classList.add('pokemon-image');
            pokemonImage.src = pokemon.imageUrl;


            modal.appendChild(pokemonName);
            modal.appendChild(closeModal);
            modal.appendChild(pokemonImage);
            modalContainer.appendChild(modal);



            console.log(pokemon);
        });
    }


    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    }

})();


let allPokemons = pokemonRepository.getAll()

pokemonRepository.loadList().then(function () {

    allPokemons.forEach(pokemon => {
        pokemonRepository.addListItem(pokemon)
    });

});

