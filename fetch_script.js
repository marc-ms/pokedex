
async function getPokemon(startIndex, stopIndex){
    console.log('inicio')
    let requests = [];
    for (let i = startIndex; i <= stopIndex; i++) {
        requests.push(apiPokemon("https://pokeapi.co/api/v2/pokemon/" + i));
    }

    let pokemonList = await Promise.all(requests); // async to get pokemon in order
    for (let pokemon of pokemonList) {
        console.log(pokemon)
        renderPokemon(pokemon);
    }
}

async function apiPokemon(url){
    const response = await fetch(url);
    const pokemonData = await response.json();

    return pokemonData;
}

function renderPokemon(pokeData) {
    const allPokemonContainer = document.getElementById("root");
    let pokeContainer = document.createElement('div');

    let pokeSprites = document.createElement('img')
    pokeSprites.classList.add('sprites_img')
    pokeSprites.srcset = pokeData.sprites['front_default']

    let pokeName = document.createElement('h4')
    pokeName.classList.add('name')
    pokeName.innerText = pokeData.name.toUpperCase()

    let pokeNumber = document.createElement('p')
    pokeNumber.classList.add('id')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeTypes = document.createElement('div')
    pokeTypes.classList.add('div_types')
    createTypes(pokeData.types, pokeTypes, pokeContainer)
    

    pokeContainer.append(pokeSprites, pokeName, pokeNumber, pokeTypes);
    allPokemonContainer.appendChild(pokeContainer);

}

function createTypes(types, div, pokeContainer) {
    types.forEach( function(type) {
        let typeName = type['type']['name'];
        let typeDiv = document.createElement('div');
        let typeIcon = document.createElement('img');

        typeDiv.classList.add('poke__type__icon', typeName);
        typeIcon.srcset = "icons/" + typeName + ".svg";

        div.append(typeDiv)
        typeDiv.append(typeIcon)
    })
    pokeContainer.classList.add(types[0]['type']['name']);
}

getPokemon(1, 151);