# 🛒 API E-commerce - Node.js

## 📌 Sobre o Projeto

API REST desenvolvida com Node.js para simular um sistema de e-commerce completo.

A aplicação permite cadastro de usuários, autenticação com JWT, gerenciamento de produtos, carrinho de compras e finalização de pedidos.

---

## 🚀 Funcionalidades

* 👤 Cadastro de usuários
* 🔐 Login com autenticação JWT
* 📦 CRUD de produtos
* 🛒 Carrinho de compras
* 🧾 Finalização de pedidos
* 📄 Histórico de pedidos

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* Express
* MySQL
* JWT (JSON Web Token)
* bcrypt
* dotenv

---

## 📂 Estrutura do Projeto

```
src/
 ├── controllers/
 ├── routes/
 ├── middlewares/
 ├── config/
 └── app.js

.env
server.js
package.json
```

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2. Acesse a pasta

```
cd seu-repositorio
```

### 3. Instale as dependências

```
npm install
```

### 4. Configure o arquivo `.env`

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=seubanco
JWT_SECRET=segredo_super_secreto
```

### 5. Execute o projeto

```
npm start
```

---

## 🔐 Autenticação

Para acessar rotas protegidas, envie o token no header:

```
Authorization: Bearer SEU_TOKEN
```

---

## 📌 Rotas da API

### 👤 Usuários

* `POST /routes/register`
* `POST /routes/login`

---

### 📦 Produtos

* `POST /routes/produtos`
* `GET /routes/produtos`

---

### 🛒 Carrinho

* `POST /routes/carrinho`
* `GET /routes/carrinho`


---

### 🧾 Pedidos

* `POST /routes/pedido`
* `GET /routes/pedidos`

---

## 🧠 Aprendizados

Durante o desenvolvimento deste projeto foram aplicados conceitos como:

* Estruturação de APIs REST
* Autenticação e autorização com JWT
* Criptografia de senhas
* Relacionamento entre tabelas (JOIN)
* Organização de código em camadas (MVC)
* Boas práticas de backend

---

## 📈 Melhorias Futuras

* Documentação com Swagger
* Deploy da API
* Sistema de pagamento
* Upload de imagens de produtos
* Testes automatizados

---

## 👨‍💻 Autor

Desenvolvido por Bruno Melo 🚀

---
