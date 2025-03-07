
async function getPokemon(startIndex, stopIndex){
    console.log('inicio')
    let requests = [];
    for (let i = startIndex; i <= stopIndex; i++) {
        requests.push(apiPokemon("https://pokeapi.co/api/v2/pokemon/" + i));
    }

    let pokemonList = await Promise.all(requests); // async to get pokemon in order
    for (let pokemon of pokemonList) {
        renderPokemon(pokemon);
        
    }
    //turnCardOver();
}

async function apiPokemon(url){
    const response = await fetch(url);
    const pokemonData = await response.json();

    return pokemonData;
}

function renderPokemon(pokeData) {
    let pokeContainer = document.getElementById('poke-container');

    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    let pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');
    pokemon.setAttribute("id", pokeData.id)

    let pokemonFront = document.createElement('div');
    pokemonFront.classList.add('front', 'face');
    

    let pokemonBack = document.createElement('div');
    pokemonBack.classList.add('back', 'face');
    

    let pokeSpritesFront = document.createElement('img')
    pokeSpritesFront.classList.add('sprites_img')
    pokeSpritesFront.srcset = pokeData.sprites['front_default']
    pokeSpritesFront.setAttribute('alt', pokeData.name);

    let pokeSpritesBack = document.createElement('img')
    pokeSpritesBack.classList.add('sprites_img')
    pokeSpritesBack.srcset = pokeData.sprites['back_default'];
    pokeSpritesBack.setAttribute('alt', pokeData.name);

    let pokeName = document.createElement('h4')
    pokeName.classList.add('name')
    pokeName.innerText = pokeData.name.toUpperCase()

    let pokeNumber = document.createElement('span')
    pokeNumber.classList.add('id')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeTypes = document.createElement('div')
    pokeTypes.classList.add('div_types')
    createTypes(pokeData.types, pokeTypes, pokemon)
    
    pokemonBack.append(pokeSpritesBack);
    pokemonFront.append(pokeSpritesFront, pokeName, pokeNumber, pokeTypes);
    pokemon.append(pokemonFront, pokemonBack);
    cardContainer.appendChild(pokemon);
    pokeContainer.appendChild(cardContainer);
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

function turnCardOver() {
    let pokeCard = document.querySelectorAll('.div_pokemon');
    pokeCard.forEach(function(card) {
        card.addEventListener('mouseover', function() {
            console.log('hover');
            card.classList.toggle('flipped');
        })
    })}

getPokemon(1, 151);
