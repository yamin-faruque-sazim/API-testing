const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const secretKey = 'your-secret-key';

const db = new sqlite3.Database(':memory:');

// Middleware to parse JSON bodies
app.use(express.json());

// Create products table and insert sample data
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, category TEXT, details TEXT)");

    const productsData = [
        { 
            name: 'Product 1', 
            price: 10.99, 
            description: 'Description for Product 1', 
            category: 'Electronics',
            details: JSON.stringify({
                brand: 'Brand A',
                specifications: {
                    weight: '1.5 lbs',
                    dimensions: '5x5x5 inches',
                    color: 'Black'
                }
            })
        },
        { 
            name: 'Product 2', 
            price: 19.99, 
            description: 'Description for Product 2', 
            category: 'Clothing',
            details: JSON.stringify({
                brand: 'Brand B',
                specifications: {
                    size: 'Medium',
                    material: 'Cotton',
                    color: 'Blue'
                }
            })
        },
        { 
            name: 'Product 3', 
            price: 29.99, 
            description: 'Description for Product 3', 
            category: 'Furniture',
            details: JSON.stringify({
                brand: 'Brand C',
                specifications: {
                    dimensions: '48x24x30 inches',
                    material: 'Wood',
                    color: 'Brown'
                }
            })
        },
    ];

    const insertProduct = db.prepare("INSERT INTO products (name, price, description, category, details) VALUES (?, ?, ?, ?, ?)");
    productsData.forEach(product => {
        insertProduct.run(product.name, product.price, product.description, product.category, product.details);
    });
    insertProduct.finalize();
});

// Temporary token endpoint
app.post('/api/generate-token', (req, res) => {
    // Generate a JWT token with a predefined payload
    const payload = { userId: '123456789' }; // Include any necessary user information
    const token = jwt.sign(payload, secretKey);

    // Return the JWT token in the response
    res.json({ token });
});

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = decoded; // Attach user information to the request object
            next(); // Allow the request to proceed to the next handler
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// GET all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const productsWithNestedInfo = rows.map(row => {
            return {
                id: row.id,
                name: row.name,
                price: row.price,
                description: row.description,
                category: row.category,
                details: JSON.parse(row.details) // Parse nested JSON string
            };
        });
        res.json(productsWithNestedInfo);
    });
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const productWithNestedInfo = {
            id: row.id,
            name: row.name,
            price: row.price,
            description: row.description,
            category: row.category,
            details: JSON.parse(row.details) // Parse nested JSON string
        };
        res.json(productWithNestedInfo);
    });
});

// POST create product
app.post('/api/products', (req, res) => {
    const { name, price, description, category, details } = req.body;
    if (!name || !price || !description || !category || !details) {
        return res.status(400).json({ message: 'Please provide name, price, description, category, and details for the product' });
    }

    // Serialize nested details object to JSON string
    const detailsJson = JSON.stringify(details);

    db.run('INSERT INTO products (name, price, description, category, details) VALUES (?, ?, ?, ?, ?)', [name, price, description, category, detailsJson], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, name, price, description, category, details });
    });
});

// PUT update product by ID (guarded with authentication)
app.put('/api/products/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    const { name, price, description, category, details } = req.body;
    if (!name || !price || !description || !category || !details) {
        return res.status(400).json({ message: 'Please provide name, price, description, category, and details for the product' });
    }

    // Serialize nested details object to JSON string
    const detailsJson = JSON.stringify(details);

    db.run('UPDATE products SET name = ?, price = ?, description = ?, category = ?, details = ? WHERE id = ?', [name, price, description, category, detailsJson, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json({ id, name, price, description, category, details });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
