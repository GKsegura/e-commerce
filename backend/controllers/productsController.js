const Product = require("../models/productModel");

exports.getAll = (req, res) => {
    Product.getAll((err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
};

exports.search = (req, res) => {
    Product.search(req.query.name, (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
};

exports.create = (req, res) => {
    Product.create(req.body, (err, product) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(product);
    });
};

exports.update = (req, res) => {
    Product.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(result);
    });
};

exports.remove = (req, res) => {
    Product.remove(req.params.id, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(result);
    });
};
