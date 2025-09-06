const db = require("../db");

exports.getAll = (callback) => {
    db.all("SELECT * FROM products", [], callback);
};

exports.search = (name, callback) => {
    const searchTerm = `%${name}%`;
    db.all("SELECT * FROM products WHERE name LIKE ?", [searchTerm], callback);
};

exports.create = (product, callback) => {
    const { name, price, stock } = product;
    db.run(
        "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
        [name, price, stock],
        function (err) {
            callback(err, { id: this.lastID, ...product });
        }
    );
};

exports.update = (id, product, callback) => {
    const { name, price, stock } = product;
    db.run(
        "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
        [name, price, stock, id],
        function (err) {
            callback(err, { updated: this.changes });
        }
    );
};

exports.remove = (id, callback) => {
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        callback(err, { deleted: this.changes });
    });
};
