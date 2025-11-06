const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:'); // In-memory DB for simplicity

// Create tables
db.serialize(() => {
  // Products table
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL
  )`);

  // Cart table
  db.run(`CREATE TABLE cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    quantity INTEGER
  )`);

  // Insert 5-10 mock products
  const products = [
    { name: "Wireless Headphones", price: 99.99 },
    { name: "Smartphone", price: 699.99 },
    { name: "Laptop", price: 1299.99 },
    { name: "Smart Watch", price: 199.99 },
    { name: "Tablet", price: 499.99 },
    { name: "Gaming Console", price: 399.99 },
    { name: "Bluetooth Speaker", price: 79.99 }
  ];

  const stmt = db.prepare("INSERT INTO products (name, price) VALUES (?, ?)");
  products.forEach(product => {
    stmt.run(product.name, product.price);
  });
  stmt.finalize();
});

// ✅ GET /api/products - 5-10 mock items
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ✅ POST /api/cart - Add {productId, qty}
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;

  // Check if product exists
  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if item already in cart
    db.get("SELECT * FROM cart WHERE productId = ?", [productId], (err, existingItem) => {
      if (existingItem) {
        // Update quantity
        db.run("UPDATE cart SET quantity = quantity + ? WHERE productId = ?", [quantity, productId], function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ message: "Item quantity updated in cart" });
        });
      } else {
        // Add new item
        db.run("INSERT INTO cart (productId, quantity) VALUES (?, ?)", [productId, quantity], function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ message: "Item added to cart", id: this.lastID });
        });
      }
    });
  });
});

// ✅ DELETE /api/cart/:id - Remove item
app.delete('/api/cart/:id', (req, res) => {
  const id = req.params.id;
  
  db.run("DELETE FROM cart WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Item not found in cart" });
      return;
    }
    res.json({ message: "Item removed from cart" });
  });
});

// ✅ GET /api/cart - Get cart + total
app.get('/api/cart', (req, res) => {
  const query = `
    SELECT cart.id, cart.productId, cart.quantity, products.name, products.price
    FROM cart 
    JOIN products ON cart.productId = products.id
  `;
  
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const total = rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      items: rows,
      total: total
    });
  });
});

// ✅ FIXED: POST /api/checkout - {name, email, cartItems} → mock receipt
app.post('/api/checkout', (req, res) => {
  const { name, email, cartItems } = req.body; // ✅ NOW getting name and email too

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Create mock receipt WITH customer info
  const receipt = {
    orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    customer: {
      name: name,
      email: email
    },
    items: cartItems,
    total: total,
    timestamp: new Date().toISOString(),
    message: "Thank you for your purchase! This is a mock transaction."
  };

  // Clear cart after checkout
  db.run("DELETE FROM cart", (err) => {
    if (err) {
      console.error("Error clearing cart:", err);
    }
  });

  res.json(receipt);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});