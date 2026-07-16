
const API_URL = "https://api-ecommerce-online.onrender.com"

document.getElementById("formLogin").addEventListener('submit', async function (e) {
    e.preventDefault()

    const dados = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    }

    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    })
    
    const resultado = await response.json();

    if(response.ok) {
        localStorage.setItem("token", resultado.data.token)
        console.log(localStorage.getItem("token"));
        const mensagem = document.getElementById("mensagem")
        mensagem.textContent = resultado.data.message
        mensagem.style.color = "green";

        setTimeout(() => {
            window.location.href = "/"
        }, 1500)
    } else{
        if(resultado.erros) {
            mensagem.innerHTML = resultado.erros.join("<br>")
        } else{
            mensagem.textContent = resultado.data.message
        }

        mensagem.style.color = "red"
    }
})