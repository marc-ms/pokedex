
async function getPokemon(startIndex, stopIndex){
    console.log('inicio')
    let requests = [];
    for (let i = startIndex; i <= stopIndex; i++) {
        requests.push(apiPokemon("https://pokeapi.co/api/v2/pokemon/" + i));
    }

    let pokemonList = await Promise.all(requests); // async to get pokemon in order
    for (let pokemon of pokemonList) {
        console.log(pokemon);
        renderPokemon(pokemon);
    }
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

    let pokemonStats = document.createElement('div');
    pokemonStats.classList.add('stats-container');
    createStats(pokeData.stats, pokemonStats);
    

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

    
    pokemonBack.append(pokemonStats, pokeSpritesBack);
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

function createStats(stats, div) {
    stats.forEach(function(stat) {
        let statName = stat['stat']['name'];
        let statNumber = stat['base_stat'];

        let statNameHtml = document.createElement('h4');
        statNameHtml.classList.add('stat-name');
        statNameHtml.innerText = statName.toUpperCase();

        if (statName == "special-attack") {
            statNameHtml.innerText = "sp. atk".toUpperCase();
        }

        if (statName == "special-defense") {
            statNameHtml.innerText = "sp. def".toUpperCase();
        }


        let statNumberHtml = document.createElement('span');
        statNumberHtml.classList.add('stat-number');
        statNumberHtml.innerText = statNumber;

        let statContainer = document.createElement('div');
        statContainer.classList.add(statName);


        statContainer.append(statNameHtml, statNumberHtml);
        div.appendChild(statContainer);
    })
}

getPokemon(1, 151);
