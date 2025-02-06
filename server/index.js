const express = require('express');
const connectDB = require('./config/db');
const User = require('./models/user');
const cors = require('cors');

const port = 3000;
const userRoutes = require('./routes/users');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001',  // Adjust based on your frontend port
  }));
  
connectDB();

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
