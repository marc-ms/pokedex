// variables
let pokemones = [];


//functions

const fetchPokemon = async () => { // asynchronous function await
    console.log('init fetch pokemon');

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

    let pokeName = document.createElement('h4')
    pokeName.innerText = pokeData.name

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeTypes = document.createElement('ul')
    createTypes(pokeData.types, pokeTypes)

    let pokeSprites = document.createElement('img')
    pokeSprites.srcset = pokeData.sprites['front_default']

    pokeContainer.append(pokeName, pokeNumber, pokeTypes, pokeSprites);
    allPokemonContainer.appendChild(pokeContainer);

}

function createTypes(types, ul) {
    types.forEach( function(type) {
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

fetchPokemon();