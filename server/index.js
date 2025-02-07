const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' })); // Adjust as per frontend origin

// Database Connection
connectDB();

// Routes
app.use('/students', studentRoutes);
app.use('/companies', companyRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
