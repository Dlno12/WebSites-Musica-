function toggleDetails(element) {
  const details = element.parentNode.querySelector('.album-details');
  details.classList.toggle('active');
}


let total = 0;

function adc_carirnho(price){
  total = total + price;
  console.log(`O total do carrinho é ${total}`);
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
              <h3 class="album-title" onclick="toggleDetails(this)">${album.title}</h3>
              <p>Autor: ${album.author}</p>
              <div class="album-details">
                  <p><strong>Álbum:</strong> ${album.album}</p>
                  <p><strong>Duração:</strong> ${album.duration}</p>
                  <p><strong>Preço:</strong> ${album.price}</p>
                  <p><em>${album.review}</em></p>
                  <button onclick="adc_carirnho(${album.price})">Adicionar ao carrinho</button>
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


