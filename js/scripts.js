let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        } else {
            document.write(
                `${pokemon} is not an object. Only object is accepted <br><br><br>`
            );
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
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // detailed information about pokemon is extracted from details argument

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
            const modalContainer = document.getElementById('modal-container');
            const modalTitle = document.getElementById('modal-title');
            const modalHeight = document.getElementById('modal-height');
            const modalImage = document.getElementById('modal-image');

            modalTitle.textContent = 'Name: ' + pokemon.name;
            modalHeight.textContent = 'Height: ' + pokemon.height;

            modalImage.setAttribute('src', pokemon.imageUrl);
            modalImage.setAttribute('alt', pokemon.name);

            modalContainer.style.display = 'block';

            console.log('test');
        });
    }

    function addListItem(pokemon) {
        let pokemonRow = document.getElementById('pokemonRow');
        let pokemonCard = document.createElement('div');
        let pokemonName = document.createElement('h5');
        let pokemonImage = document.createElement('img');

        pokemonImage.classList.add('pokemon-image');
        pokemonCard.classList.add(
            'card',
            'pokemon-card',
            'col-lg-3',
            'col-md-4',
            'col-sm-6',
            'mb-4'
        );

        loadDetails(pokemon).then(function () {
            pokemonImage.src = pokemon.imageUrl;
        });

        pokemonName.innerText = pokemon.name;

        pokemonCard.setAttribute('data-target', '#modal-container');
        pokemonCard.setAttribute('data-toggle', 'modal');

        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonImage);

        pokemonRow.appendChild(pokemonCard);

        pokemonCard.addEventListener('click', function () {
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
    };
})();

let allPokemons = pokemonRepository.getAll();

pokemonRepository.loadList().then(function () {
    allPokemons.forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
});
