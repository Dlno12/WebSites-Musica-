function toggleDetails(element) {
  const details = element.parentNode.querySelector('.album-details');
  details.classList.toggle('active');
}


function adc_carirnho(albumTitle) {
  // Obter o preço do álbum diretamente pelo id do preço
  const albumPrice = parseFloat(document.getElementById(`preco-${albumTitle}`).textContent.replace('Preço: R$', '').trim());

  // Obter o carrinho atual ou criar um novo carrinho vazio
  let carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];

  // Adicionar o álbum ao carrinho
  carrinho.push({
    title: albumTitle,
    price: albumPrice
  });

  // Atualizar o sessionStorage com o novo carrinho
  sessionStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Atualizar o total
  let total = carrinho.reduce((sum, item) => sum + item.price, 0);

  // Imprimir no console o que foi adicionado ao carrinho
  console.log(`Álbum "${albumTitle}" adicionado ao carrinho com o preço de R$ ${albumPrice.toFixed(2)}`);
  console.log(`Total do carrinho: R$ ${total.toFixed(2)}`);
}




function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}


const category = getQueryParameter('category');
const categoryTitle = document.getElementById('category-title');

fetch('music.json')
.then(response => response.json())
.then(data => {
let albums = [];

if (category === 'todos') {
  albums = data.music;
} else {
  albums = data.music.filter(album => album.category.toLowerCase() === category.toLowerCase());
}

if (category === 'todos') {
  categoryTitle.textContent = 'Todos os Álbuns';
} else {
  categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
}

const albumList = document.getElementById('album-list');

if (albums.length > 0) {
  albumList.innerHTML = `<h2>Álbuns ${category === 'todos' ? 'de Todos os Gêneros' : `de ${category.charAt(0).toUpperCase() + category.slice(1)}`}:</h2>${albums.map(album => `
      <div class="album">
          <img src="${album.cover}" alt="${album.title}">
          <div>
              <h3 class="album-title" id="${album.title}" onclick="toggleDetails(this)">${album.title}</h3>
              <p class="album-author">Autor: ${album.author}</p>
              <div class="album-details">
                  <p><strong>Álbum:</strong> ${album.album}</p>
                  <p><strong>Duração:</strong> ${album.duration}</p>
                  <p><em>${album.review}</em></p>
                  <p class="preco" id="preco-${album.title}"><strong>Preço:</strong> R$ ${album.price}</p>
                  <button class="adc_carrinho" id="${album.title} "onclick="adc_carirnho('${album.title}')">Adicionar ao carrinho</button>
              </div>
          </div>
      </div>
  `).join('')}`;
} else {
  albumList.innerHTML = `<p>Nenhum álbum encontrado.</p>`;
}
})
.catch(error => {
console.error('Erro ao carregar os álbuns:', error);
document.getElementById('album-list').innerHTML = '<p>Erro ao carregar os álbuns.</p>';
});


