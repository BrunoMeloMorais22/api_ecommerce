

const API_URL = "https://api-ecommerce-online.onrender.com"

const naoLogado = document.getElementById("naoLogado")
const logado = document.getElementById("logado")
const token = localStorage.getItem("token")
const logout = document.getElementById("logout")
 
if(token) {
    naoLogado.style.display = "none";
    logado.style.display = "flex";
}
else{
    naoLogado.style.display = "flex";
    logado.style.display = "none"
}

logout.addEventListener("click", (e) => {
    e.preventDefault()

    localStorage.removeItem("token")

    window.location.href = "/"
})

async function carregarProdutos() {
    const response = await fetch(`${API_URL}/products/produtos`)

    const resultado = await response.json()
    
    const container = document.getElementById("cards")

    container.innerHTML = " ";

    resultado.data.forEach(produto => {
        const preco = Number(produto.preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        container.innerHTML += `
            <div class="card">
                <img src="${API_URL}/uploads/${produto.imagem}">

                <h3>${produto.nome}</h3>
                
                <p>${produto.descricao}</p>

                <span>${preco}</span>

                <button>Ver produto</button>
            </div>
        `
    });
}

carregarProdutos()