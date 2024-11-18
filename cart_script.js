
// Função para carregar os itens do carrinho
function carregarCarrinho() {
    const carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];
    const carrinhoTabela = document.getElementById('carrinho-tabela').querySelector('tbody');
    let total = 0;

    carrinhoTabela.innerHTML = '';

    carrinho.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.title}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
        `;
        carrinhoTabela.appendChild(tr);
        total += item.price;
    });

    document.getElementById('total-value').textContent = total.toFixed(2);
}

window.onload = carregarCarrinho;


// Função para limpar o carrinho
function limparCarrinho() {
    sessionStorage.removeItem('carrinho');
    carregarCarrinho();
    console.log('Carrinho limpo!');
}
