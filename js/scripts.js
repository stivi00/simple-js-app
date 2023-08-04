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
        return fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            json.results.forEach(function (item) {

                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        })
        .catch(function (e) {
            console.error(e)
        })
    }


    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (details) {

            // detailed information about pokemon is extracted from details argument

            console.log(details)
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
        })
        .catch(function (e) {
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
            modal.classList.add('custom-modal');

            let modalHeader = document.createElement('div');
            modalHeader.classList.add('custom-modal-header');

            let closeModal = document.createElement('button');
            closeModal.classList.add('custom-modal-close');
            closeModal.innerText = 'Close';

            let modalFooter = document.createElement('div');
            modalFooter.classList.add('custom-modal-footer');

            let pokemonName = document.createElement('h2');
            pokemonName.innerText = pokemon.name;

            let pokemonHeight = document.createElement('p');
            pokemonHeight.innerText = 'HEIGHT: ' + pokemon.height

            let typesElement = document.createElement('p');
            typesElement.innerHTML = "TYPE: " + pokemon.types.map( pokemon => {
                return pokemon.type.name
            })


            let pokemonImage = document.createElement('img');
            pokemonImage.classList.add('pokemon-image');
            pokemonImage.src = pokemon.imageUrl;

            modalHeader.appendChild(pokemonName);
            modalHeader.appendChild(closeModal);
            
            modalFooter.appendChild(pokemonHeight);
            modalFooter.appendChild(typesElement);

            modal.appendChild(modalHeader);
            modal.appendChild(pokemonImage);
            modal.appendChild(modalFooter);
            modalContainer.appendChild(modal);

            //close modal on click 
            document.querySelector('.custom-modal-close').addEventListener('click', () => {
                hideModal();
            });

        });
    }


    // is this the most optimal way to hide modal?
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });


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
        loadDetails: loadDetails,
        hideModal: hideModal
    }

})();


let allPokemons = pokemonRepository.getAll()

pokemonRepository.loadList().then(function () {

    allPokemons.forEach(pokemon => {
        pokemonRepository.addListItem(pokemon)
    });

});

