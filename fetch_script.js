// variables
const pokemonContainer = document.getElementById("pokemon-list");
let pokemon = [];


//functions

const fetchPokemon = async () => { // asynchronous function await
    console.log('init fetch pokemon');

    try {
        const url = "https://pokeapi.co:443/api/v2/pokemon?limit=151";
        const response = await fetch(url); // default option GET
        const data = await response.json();
        pokemon = data["results"];
        console.log(pokemon);
    } catch (error) {
        console.log("Failed to get pokemon", error);
        pokemonContainer.innerHTML = "<li>Failed to load</li>"; //html embedding
        return; // if anything fails, stope here
    }

    let template = "";
    pokemon.forEach((iPokemon, index) => {
        template += `<li>${index + 1} ${iPokemon.name}</li>`;
    });

    pokemonContainer.innerHTML = template;
}

fetchPokemon();