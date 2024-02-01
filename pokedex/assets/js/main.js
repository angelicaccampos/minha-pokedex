// Obtém a referência do botão "Carregar Mais" pelo ID
const loadMoreButton = document.getElementById('loadMoreButton');

// Número máximo de registros na PokeAPI
const maxRecords = 151;

// Número de registros a serem carregados por vez
const limit = 24;

// Inicializa o deslocamento (offset) como 0
let offset = 0;

// Obtém a referência da lista de Pokémon pelo ID
const pokemonList = document.getElementById('pokemonList');

// Função para carregar itens de Pokémon com base no deslocamento e limite
function loadPokemonItems(offset, limit) {
    // Chama o método getPokemons da pokeApi (supondo que pokeApi seja uma instância válida)
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Mapeia a lista de Pokémon para HTML
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        <!-- Adiciona a imagem do Pokémon -->
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                        <!-- Mapeia os tipos do Pokémon para elementos de lista -->
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </li>
        `).join('');

        // Adiciona o novo HTML à lista existente
        pokemonList.innerHTML += newHtml;
    });
}

// Inicializa o carregamento dos primeiros Pokémon
loadPokemonItems(offset, limit);

// Adiciona um ouvinte de eventos para o botão "Carregar Mais"
loadMoreButton.addEventListener('click', () => {
    // Incrementa o deslocamento pelo limite
    offset += limit;

    // Chama a função para carregar mais Pokémon
    loadPokemonItems(offset, limit);
});


// Função para carregar Pokémon por nome
function loadPokemonItemsByName(name) {
    // Chama o método getPokemonByName da pokeApi
    pokeApi.getPokemonByName(name).then((pokemon) => {
        // Cria um array contendo apenas o Pokémon encontrado
        const pokemons = [pokemon];

        // Chama a função para carregar itens de Pokémon
        loadPokemonItems(0, 1);
    }).catch((error) => {
        // Se nenhum Pokémon for encontrado, exibe uma mensagem de alerta
        alert(`Nenhum Pokémon encontrado com o nome: ${name}`);
    });
}

// Função para pesquisar Pokémon por nome
function search() {
    // Limpa a lista atual de Pokémon
    pokemonList.innerHTML = '';

    // Obtém o valor do campo de pesquisa
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Verifica se o termo de pesquisa não está vazio
    if (searchTerm.trim() !== '') {
        // Chama a função para carregar Pokémon com base no termo de pesquisa
        loadPokemonItemsByName(name);
    } else {
        // Se o termo de pesquisa estiver vazio, carrega Pokémon normalmente
        loadPokemonItems(offset, limit);
    }
}