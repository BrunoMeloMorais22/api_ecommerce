const express = require("express");
const path = require("path");
const userRoutes = require('./src/routes/userRoutes')
const productRoutes = require('./src/routes/productRoutes')
const orderRoutes = require('./src/routes/orderRoutes')
const cartRoutes = require('./src/routes/cartRoutes')
const errorHandler = require('./src/utils/AppError')
const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "./src/uploads")));

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"public/html/index.html"));
});

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/html/login.html"));
});

app.get("/cadastro",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/html/cadastro.html"));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/dashboardAdmin.html"))
})

module.exports = app;