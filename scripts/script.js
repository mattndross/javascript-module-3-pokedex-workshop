const cardContainer = document.querySelector(".card-container");

const clearContainer = () => {
  cardContainer.innerHTML = "";
};

const renderPokemonCard = (pokemonObj) => {
  clearContainer();
  cardContainer.innerHTML = '<div class="card  border-4 rounded-3"><h4 class="pkmn-name d-flex justify-content-end me-3"></h4><div class="card-body"><div class="image-space d-flex justify-content-center"><img src="..." class="pkmn-img position-absolute" alt="..."></div><div class="pkmn-info pt-5 bg-info rounded"><div class="pkmn-types d-flex justify-content-center"></div><div class="pkmn-properties d-flex justify-content-center "><div class="pkmn-weigth-container pe-3"><p class="pkmn-weight"></p><h6>Weight</h6></div><div class="pkmn-height-container border border-primary border-top-0 border-bottom-0 ps-3  pe-3"><p class="pkmn-height"></p><h6>Height</h6></div><div class="pkmn-moves-container ps-3"><ul class="pkmn-moves"></ul><h6>Moves</h6></div></div><div class="pkmn-stats"><h3 class="stats-title">Base stats</h3><div class="row"><ul class="col-4 stats-names"><li>HP</li><li>ATK</li><li>DEF</li><li>SATK</li><li>SDEF</li><li>SPD</li></ul><div class="col-8 stats-graphics"></div></div></div></div></div></div>';
  document.querySelector(".card").classList.add(`${pokemonObj.types[0].type.name}-bg`) //sets background color
  document.querySelector(".pkmn-name").innerHTML = `#${
    pokemonObj.id
  } - ${pokemonObj.name.charAt(0).toUpperCase()}${pokemonObj.name.slice(1)}`;
  document.querySelector(".pkmn-img").src = pokemonObj.sprites.front_default;

  //print weight
  document.querySelector(".pkmn-weight").innerHTML= `${(pokemonObj.weight * 0.1).toFixed(2)}kg`;
  
  //print height
  document.querySelector(".pkmn-height").innerHTML= `${(pokemonObj.height * 0.1).toFixed(2)}m`;

  //print 2 moves
  const movesList = pokemonObj.moves;
  let moveObj1;
  let moveObj2;

  if (movesList.length > 0){
    moveObj1 =  movesList[Math.floor(Math.random() * movesList.length)];
    const move1 = document.createElement('li');
    move1.innerHTML= moveObj1.move.name
    document.querySelector(".pkmn-moves").appendChild(move1)
  } else {
    document.querySelector(".pkmn-moves").innerHTML = 'No moves to show'
  }

  if (movesList.length > 1) {
    do {
     moveObj2 = movesList[Math.floor(Math.random() * movesList.length)];
  } while(moveObj2 === moveObj1) };
  
  if (moveObj2) {
    const move2 = document.createElement('li');
    move2.innerHTML = moveObj2.move.name;
    document.querySelector(".pkmn-moves").appendChild(move2)
  }
  
  

  //print pokemon type/s
  pokemonObj.types.forEach((typeObj) => {
    const type = document.createElement("div");
    type.innerHTML = typeObj.type.name;
    type.classList.add(`${typeObj.type.name}-bg`, "rounded-pill", "type");
    document.querySelector(".pkmn-types").appendChild(type);
  });

  //print pokemon stats
  pokemonObj.stats.forEach((statObj) => {
    const stat = document.createElement("li");
    stat.innerHTML = statObj.base_stat;
    document.querySelector(".stats-graphics").appendChild(stat);
  });
};
const renderMissingno = (search) => {
  clearContainer();
  cardContainer.innerHTML =
    '<div class="card"><h4 class="missingno-title"></h4><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.S0X8TvAIUaAoQnzzt_GfpAHaHa%26pid%3DApi&f=1" class="card-img" alt="..."><div class="card-body"><p class="missingno-text"></p></div></div>';
  document.querySelector(".missingno-title").innerHTML = "Nº??? - MissingNo";
  document.querySelector(
    ".missingno-text"
  ).innerHTML = `Something went wrong with your search: "<strong>${search}</strong>"`;
};
const getPokemon = async (search) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
    const res = await fetch(url);
    const parsedRes = await res.json();
    renderPokemonCard(parsedRes);
  } catch {
    renderMissingno(search);
  }
};

document.querySelector("#search-btn").addEventListener("click", () => {
  const search = document.querySelector(".pkmn-input").value;
  search && getPokemon(search);
  document.querySelector(".pkmn-input").value = "";
});



document.querySelector("#random-btn").addEventListener("click", () => {
  const randomNum = Math.floor(Math.random() * 898 + 1);
  getPokemon(randomNum);
});
