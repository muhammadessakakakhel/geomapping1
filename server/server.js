const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false, // Use this for local development
    },
});


app.get('/api/restaurants', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM restaurant_locations2');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// const express = require('express');
// const { Pool } = require('pg');
// const cors = require('cors');
// const redis = require('redis');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // PostgreSQL connection pool
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     ssl: {
//         rejectUnauthorized: false, // Use for local development
//     },
// });

// // Redis client for caching
// const redisClient = redis.createClient();
// redisClient.connect().catch(console.error);

// // API endpoint to fetch restaurant data with pagination
// app.get('/api/restaurants', async (req, res) => {
//     const limit = parseInt(req.query.limit) || 100; // Default to 100 rows
//     const offset = parseInt(req.query.offset) || 0; // Default to the first page
//     const cacheKey = `restaurants_${limit}_${offset}`; // Unique cache key per pagination

//     try {
//         // Check Redis cache
//         const cachedData = await redisClient.get(cacheKey);
//         if (cachedData) {
//             console.log('Cache hit');
//             return res.json(JSON.parse(cachedData));
//         }

//         // Fetch data from PostgreSQL
//         console.log('Cache miss - querying database');
//         const query = 'SELECT id, name, address FROM restaurant_locations2 LIMIT $1 OFFSET $2';
//         const result = await pool.query(query, [limit, offset]);

//         // Save result in Redis with a 1-hour expiration
//         redisClient.set(cacheKey, JSON.stringify(result.rows), { EX: 3600 });

//         res.json(result.rows);
//     } catch (error) {
//         console.error('Error fetching restaurants:', error.message);
//         res.status(500).send(error.message);
//     }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
