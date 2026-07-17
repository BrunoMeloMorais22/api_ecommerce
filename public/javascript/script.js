
const API_URL = "https://api-ecommerce-online.onrender.com"

let produtoEditado = null;

const naoLogado = document.getElementById("naoLogado")
const logado = document.getElementById("logado")
const token = localStorage.getItem("token")
const logout = document.querySelectorAll(".logout")
const role = localStorage.getItem("role")
const logadoAdmin = document.getElementById("logadoAdmin")
 
if (!token) {

    naoLogado.style.display = "flex";
    logado.style.display = "none";
    logadoAdmin.style.display = "none";

} else {

    if (role === "Admin") {

        naoLogado.style.display = "none";
        logado.style.display = "none";
        logadoAdmin.style.display = "flex";

    } else {

        naoLogado.style.display = "none";
        logado.style.display = "flex";
        logadoAdmin.style.display = "none";

    }

}


logout.forEach(botao => {
    botao.addEventListener("click", (e) => {
        e.preventDefault()

        localStorage.removeItem("token")
        localStorage.removeItem("role")

        window.location.href = "/"
    })
})

async function carregarProdutos() {
    const response = await fetch(`${API_URL}/products/produtos`)

    const resultado = await response.json()

    const role = localStorage.getItem("role")
    
    const container = document.getElementById("cards")

    container.innerHTML = "";

    resultado.data.forEach(produto => {

        const preco = Number(produto.preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        let botoes = "";

        if(role === "Admin"){
            botoes = `
                <button class="editar" onclick="editarProduto(${produto.id})">Editar</button> <br><br>
                <button class="excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
            `
        }
        else{
            botoes = `
                <button>Ver produtos</button>
            `
        }
        
        container.innerHTML += `
            <div class="card">
                <img src="${API_URL}/uploads/${produto.imagem}">

                <h3>${produto.nome}</h3>
                
                <p>${produto.descricao}</p>

                <span>${preco}</span>

                ${botoes}
            </div>
        `
    });
}

async function editarProduto(id) {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/products/produtos/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const produto = await response.json()

    if(!response.ok){
        alert(produto.message || "Erro ao buscar produto")
        return
    }

    document.getElementById("nome").value = produto.nome
    document.getElementById("preco").value = produto.preco
    document.getElementById("estoque").value = produto.estoque
    document.getElementById("descricao").value = produto.descricao

    produtoEditado = id

    document.getElementById("modal").style.display = "block"
}

async function excluirProduto(id) {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/products/produtos/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(response.ok){
        carregarProdutos()
    }
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none'
}

async function salvarEdicao() {
    const response = await fetch(`${API_URL}/products/produtos/${produtoEditado}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            preco: Number(document.getElementById("preco").value),
            estoque: Number(document.getElementById("estoque").value),
            descricao: document.getElementById("descricao").value
        })
    });

    if (response.ok) {
        await carregarProdutos();
        fecharModal();
        produtoEditado = null;
    } else {
        const erro = await response.json();
        alert(erro.error || "Erro ao atualizar produto");
    }
}


carregarProdutos()