import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css"; // importa o CSS separado

const API_URL = "http://localhost:5000/products";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState(""); // 🔍 estado da pesquisa

  const searchTimeout = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch produtos (tudo ou pesquisa)
  const fetchProducts = async (query = "") => {
    try {
      const url = query ? `${API_URL}/search?name=${query}` : API_URL;
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing}`, data);
        setEditing(null);
      } else {
        await axios.post(API_URL, data);
      }
      setForm({ name: "", price: "", stock: "" });
      fetchProducts(search);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setEditing(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts(search); // mantém a pesquisa
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (searchTimeout.current)
      clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      fetchProducts(value);
    }, 300);
  };

  return (
    <div className="container">
      <h1>Sistema de Papelaria</h1>

      {/* 🔍 Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={search}
        onChange={handleSearch}
        className="search"
      />

      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome do produto"
          required
        />
        <input
          type="number"
          step="0.01"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Preço"
          required
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Estoque"
          required
        />
        <button type="submit" className="btn">
          {editing ? "Atualizar" : "Adicionar"}
        </button>
      </form>

      <ul className="list">
        {products.length === 0 ? (
          <p className="no-products">Nenhum produto encontrado</p>
        ) : (
          products.map((p) => (
            <li key={p.id} className="list-item">
              <span>{p.name} — <strong>R${p.price.toFixed(2)}</strong> — Estoque: {p.stock}</span>
              <div>
                <button className="btn edit" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn delete" onClick={() => handleDelete(p.id)}>Excluir</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
