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


    function addListItem(pokemon) {
        let pokemonRow = document.getElementById("pokemonRow");
        let pokemonCard = document.createElement("div");

        pokemonCard.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4", "pokemon-card"); // Set Bootstrap grid classes
        let button = document.createElement("button");
        button.innerText = pokemon.name;

        button.classList.add("btn", "btn-primary", "w-100"); // Add Bootstrap utility classes
        button.setAttribute("data-target", "#modal-container"); // Set data-target attribute
        button.setAttribute("data-toggle", "modal"); // Set data-toggle attribute

        pokemonCard.appendChild(button);
        pokemonRow.appendChild(pokemonCard);
        button.classList.add("rainbow-gradient-button");

        button.addEventListener("click", function (event) {
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
    }

})();


let allPokemons = pokemonRepository.getAll()

pokemonRepository.loadList().then(function () {

    allPokemons.forEach(pokemon => {
        pokemonRepository.addListItem(pokemon)
    });

});

//FOR BUG WHERE MODAL CONTENT IS NOT XLEARED AFTER CLOSING 

//apparently this code should work but doesn't

// $(document).ready(function () {
        
//     $('.modal').on('hidden.bs.modal', function () {
//         $(this).removeData('bs.modal');
//     });
// });