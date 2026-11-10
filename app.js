
const express = require('express');

const dotenv = require('dotenv');

const productRoutes = require('./routes/products');

const requestLogger = require('./middleware/logger');

// Load config

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies

app.use(express.json());
// Essential Middleware
app.use(requestLogger);

// API Key Middleware

const checkApiKey = (req, res, next) => {

    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_SECRET) {

        return res.status(403).json({ message: 'Forbidden: Invalid API Key'

});
    }

    next();

};









//Mount the routes 
// Any request to /api/products will be handled by productRoutes

app.use('/api/products', productRoutes);






// Health Check

app.get('/health', (req, res) => {

    res.status(200).json({ status: 'UP', service:

    process.env.SERVICE_NAME });

 });

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});







app.listen(port, () => {

    console.log(`${process.env.SERVICE_NAME} running on

    http://localhost:${port}`);

});
