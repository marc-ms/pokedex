//functions

const fetchPokemons = async () => { // asynchronous function await
    let pokemones = [];
    try {
        const url = "https://pokeapi.co:443/api/v2/pokemon?limit=151";
        const response = await fetch(url); // default option GET
        const data = await response.json();
        pokemones = data["results"];
    } catch (error) {
        console.log("Failed to get pokemon", error);
        allPokemonContainer.innerHTML = "<li>Failed to load</li>"; //html embedding
        return; // if anything fails, stope here
    }

    pokemones.forEach(function(pokemon){
        fetchPokemonDetails(pokemon)
    })
}

function fetchPokemonDetails(pokemon) {
    let url = pokemon.url;
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData) {
        console.log(pokeData)
        renderPokemon(pokeData)
    })
}

function renderPokemon(pokeData) {
    const allPokemonContainer = document.getElementById("root");
    let pokeContainer = document.createElement('div');

    let pokeSprites = document.createElement('img')
    pokeSprites.srcset = pokeData.sprites['front_default']

    let pokeName = document.createElement('h4')
    pokeName.classList.add('name')
    pokeName.innerText = pokeData.name.toUpperCase()

    let pokeNumber = document.createElement('p')
    pokeNumber.classList.add('id')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeTypes = document.createElement('ul')
    pokeTypes.classList.add('types')
    createTypes(pokeData.types, pokeTypes)

    pokeContainer.append(pokeSprites, pokeName, pokeNumber, pokeTypes);
    allPokemonContainer.appendChild(pokeContainer);

}

function createTypes(types, ul) {
    types.forEach( function(type) {
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

fetchPokemons();