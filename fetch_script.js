// variables
//const pokemonContainer = document.getElementById("pokemon-list");
let pokemon = [];


//functions

const fetchPokemon = async () => {
    console.log('init fetch pokemon')

    const url = "https://pokeapi.co:443/api/v2/pokemon?limit=151";
    const response = await fetch(url);
    const data = await response.json();
    for (let i = 0; i < data['results'].length; i++){
        console.log(data['results'][i]);
    }
    console.log(data['results'][1])
}

fetchPokemon();