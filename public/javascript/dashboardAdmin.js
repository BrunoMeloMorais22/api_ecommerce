const API_URL = "http://localhost:3000"

const token = localStorage.getItem("token")

document.getElementById("formProduto").addEventListener('submit', async function (e) {
    e.preventDefault()

    const form = document.getElementById("formProduto")

    const formData = new FormData(form)

    const response = await fetch(`${API_URL}/products/produtos`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })

    const resultado = await response.json();

    const mensagem = document.getElementById("mensagem")

    if(response.ok) {
        mensagem.textContent = resultado.mensagem
        mensagem.style.color = "green";

        setTimeout(() => {
            window.location.href = "/"
        }, 1500)

    } else {
        if(resultado.erros) {
            mensagem.innerHTML = resultado.erros.join("<br>")
        } else {
            mensagem.textContent = resultado.mensagem
        }

        mensagem.style.color = "red"
    }
})