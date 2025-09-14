const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./database.sqlite');

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Customers table
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company TEXT,
    city TEXT,
    total_spent REAL DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Sales table
  db.run(`CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    customer_name TEXT NOT NULL,
    product TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    amount REAL NOT NULL,
    status TEXT DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (id)
  )`);

  // Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin user
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (email, password, name, role) VALUES (?, ?, ?, ?)`,
    ['admin@company.com', hashedPassword, 'Admin User', 'admin']);

  // Insert sample products
  const products = [
    ['Laptop Pro 15"', 1299.99, 'Electronics'],
    ['Wireless Headphones', 199.99, 'Audio'],
    ['Smartphone X', 899.99, 'Electronics'],
    ['Tablet Air', 599.99, 'Electronics'],
    ['Gaming Mouse', 79.99, 'Accessories'],
    ['Mechanical Keyboard', 149.99, 'Accessories'],
    ['Monitor 4K', 399.99, 'Electronics'],
    ['Webcam HD', 99.99, 'Accessories'],
    ['Bluetooth Speaker', 129.99, 'Audio'],
    ['Power Bank', 49.99, 'Accessories']
  ];

  products.forEach(product => {
    db.run(`INSERT OR IGNORE INTO products (name, price, category) VALUES (?, ?, ?)`, product);
  });
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  });
});

// Customers API
app.get('/api/customers', authenticateToken, (req, res) => {
  db.all('SELECT * FROM customers ORDER BY created_at DESC', (err, customers) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(customers);
  });
});

app.post('/api/customers', authenticateToken, (req, res) => {
  const { name, email, phone, company, city, status } = req.body;
  
  db.run(
    'INSERT INTO customers (name, email, phone, company, city, status) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, phone, company, city, status || 'active'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, message: 'Customer created successfully' });
    }
  );
});

app.put('/api/customers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, phone, company, city, status } = req.body;
  
  db.run(
    'UPDATE customers SET name = ?, email = ?, phone = ?, company = ?, city = ?, status = ? WHERE id = ?',
    [name, email, phone, company, city, status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Customer updated successfully' });
    }
  );
});

app.delete('/api/customers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM customers WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Customer deleted successfully' });
  });
});

// Sales API
app.get('/api/sales', authenticateToken, (req, res) => {
  db.all('SELECT * FROM sales ORDER BY created_at DESC', (err, sales) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(sales);
  });
});

app.post('/api/sales', authenticateToken, (req, res) => {
  const { customerId, customerName, product, quantity, unitPrice, amount, status } = req.body;
  
  db.run(
    'INSERT INTO sales (customer_id, customer_name, product, quantity, unit_price, amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [customerId, customerName, product, quantity, unitPrice, amount, status || 'completed'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, message: 'Sale created successfully' });
    }
  );
});

app.put('/api/sales/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { customerId, customerName, product, quantity, unitPrice, amount, status } = req.body;
  
  db.run(
    'UPDATE sales SET customer_id = ?, customer_name = ?, product = ?, quantity = ?, unit_price = ?, amount = ?, status = ? WHERE id = ?',
    [customerId, customerName, product, quantity, unitPrice, amount, status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Sale updated successfully' });
    }
  );
});

app.delete('/api/sales/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM sales WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Sale deleted successfully' });
  });
});

// Products API
app.get('/api/products', authenticateToken, (req, res) => {
  db.all('SELECT * FROM products ORDER BY name', (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(products);
  });
});

// Analytics API
app.get('/api/analytics', authenticateToken, (req, res) => {
  const queries = {
    totalRevenue: 'SELECT SUM(amount) as total FROM sales',
    totalCustomers: 'SELECT COUNT(*) as total FROM customers',
    totalSales: 'SELECT COUNT(*) as total FROM sales',
    monthlyRevenue: 'SELECT strftime("%Y-%m", created_at) as month, SUM(amount) as revenue FROM sales GROUP BY month ORDER BY month',
    topProducts: 'SELECT product, SUM(amount) as revenue FROM sales GROUP BY product ORDER BY revenue DESC LIMIT 5'
  };

  const results = {};
  let completed = 0;
  const total = Object.keys(queries).length;

  Object.entries(queries).forEach(([key, query]) => {
    db.all(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      results[key] = rows;
      completed++;
      
      if (completed === total) {
        res.json(results);
      }
    });
  });
});

// CSV Upload endpoint
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload/customers', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Process and insert data
      let inserted = 0;
      results.forEach(row => {
        if (row.name && row.email) {
          db.run(
            'INSERT OR IGNORE INTO customers (name, email, phone, company, city, status) VALUES (?, ?, ?, ?, ?, ?)',
            [row.name, row.email, row.phone || '', row.company || '', row.city || '', row.status || 'active'],
            function(err) {
              if (!err) inserted++;
            }
          );
        }
      });
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      
      res.json({ message: `${inserted} customers imported successfully` });
    });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Smart Sales Dashboard API ready`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});

