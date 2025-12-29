// Main entry point for the backend server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const waterQualityRoutes = require('./routes/waterQuality');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', waterQualityRoutes);

app.get('/', (req, res) => {
    res.send('Water Quality Monitoring System API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});