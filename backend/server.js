const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/products");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
