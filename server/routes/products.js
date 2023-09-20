const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose(); // Import sqlite3

// Koneksi ke database SQLite
const db = new sqlite3.Database("superindo.db"); // Ganti nama file sesuai database Anda

// Route untuk mendapatkan semua produk
router.get("/", (req, res) => {
    const query = "SELECT * FROM product";

    db.all(query, [], (err, products) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        res.json(products);
    });
});

// Route untuk menambahkan produk baru
router.post("/", async (req, res) => {
    try {
        const {
            plu,
            name,
            product_category_id,
            active,
            created_user,
            created_date,
            updated_user,
            updated_date,
        } = req.body;

        const query =
            "INSERT INTO product (plu, name, product_category_id, active, created_user, created_date, updated_user, updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        db.run(
            query,
            [
                plu,
                name,
                product_category_id,
                active,
                created_user,
                created_date,
                updated_user,
                updated_date,
            ],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Server error" });
                }

                const productId = this.lastID; // Mendapatkan ID yang dihasilkan oleh database

                // Generate PLU berdasarkan productId
                const plu = `PDCT${String(productId).padStart(4, "0")}`;

                // Update PLU ke dalam database
                db.run("UPDATE product SET plu = ? WHERE id = ?", [plu, productId], function (err) {
                    if (err) {
                        return res.status(500).json({ message: "Server error" });
                    }

                    const newProduct = {
                        id: productId,
                        plu: plu,
                        name,
                        product_category_id,
                        active,
                        created_user,
                        created_date,
                        updated_user,
                        updated_date,
                    };

                    newProduct;
                    res.status(201).json(newProduct);
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route untuk memperbarui produk berdasarkan ID
router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            product_category_id,
            active,
            created_user,
            created_date,
            updated_user,
            updated_date,
        } = req.body;
        const productId = req.params.id;

        const query =
            "UPDATE product SET name = ?, product_category_id = ?, active = ?, created_user = ?, created_date = ?, updated_user = ?, updated_date = ?,  WHERE id = ?";
        db.run(
            query,
            [
                name,
                product_category_id,
                active,
                created_user,
                created_date,
                updated_user,
                updated_date,
                productId,
            ],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Server error" });
                }

                if (this.changes === 0) {
                    return res.status(404).json({ message: "Product not found" });
                }

                const updatedProduct = {
                    id: productId,
                    name,
                    product_category_id,
                    active,
                    created_user,
                    updated_user,
                    updated_date,
                };

                res.json(updatedProduct);
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route untuk menghapus produk berdasarkan ID
router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        const query = "DELETE FROM product WHERE id = ?";
        db.run(query, [productId], function (err) {
            if (err) {
                return res.status(500).json({ message: "Server error" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.json({ message: "Product deleted" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
