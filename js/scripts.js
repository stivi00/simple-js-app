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

            //for some reason modal will show previously clicked pokemon for short time 

            const modalContainer = document.getElementById("modal-container");
            const modalTitle = document.getElementById("modal-title");
            const modalHeight = document.getElementById("modal-height");
            const modalImage = document.getElementById("modal-image");
      
            modalTitle.textContent = "Name: " + pokemon.name;
            modalHeight.textContent = "Height: " + pokemon.height
      
            modalImage.setAttribute("src", pokemon.imageUrl);
            modalImage.setAttribute("alt", pokemon.name);
      
            modalContainer.style.display = "block";

        });
    }


    // is this the most optimal way to hide modal?
    // function hideModal() {
    //     let modalContainer = document.querySelector('#modal-container');
    //     modalContainer.classList.remove('is-visible');
    // }

    // window.addEventListener('keydown', (e) => {
    //     let modalContainer = document.querySelector('#modal-container');
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //         hideModal();
    //     }
    // });


    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('list-group-item');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary');
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
        // hideModal: hideModal
    }

})();


let allPokemons = pokemonRepository.getAll()

pokemonRepository.loadList().then(function () {

    allPokemons.forEach(pokemon => {
        pokemonRepository.addListItem(pokemon)
    });

});

