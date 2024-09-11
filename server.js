require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const { expressjwt } = require('express-jwt');

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Ensure environment variables are loaded
const { MONGO_URI, SECRET, PORT } = process.env;

if (!SECRET) {
  throw new Error('SECRET environment variable is not set');
}

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
  } catch (err) {
    console.error('Failed to connect to DB:', err);
  }
}

connectToDatabase();

// API routes
app.use('/api/get', require('./routes/getRouter'));
app.use('/api/auth', require('./routes/authRouter'));

// JWT authentication middleware for admin routes
app.use('/api/admin', expressjwt({ 
  secret: SECRET,
  algorithms: ['HS256']
}).unless({
  path: ['/api/auth/login', '/api/auth/signup'] // Public paths, adjust as needed
}));

// Protected admin routes
app.use('/api/admin/yarn', require('./routes/yarnRouter'));
app.use('/api/admin/inventory', require('./routes/inventoryRouter'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ errMsg: 'Invalid token' });
  }
  return res.status(500).send({ errMsg: err.message });
});

// Catch-all route for serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
const port = parseInt(PORT, 10);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const app = express()
// require('dotenv').config()
// const mongoose = require('mongoose')
// const morgan = require('morgan')
// const { expressjwt } = require('express-jwt')
// const path = require("path")

// app.use(express.json())
// app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, "client", "dist")))

// mongoose.set('strictQuery', true)
// mongoose.connect(
//   process.env.MONGO_URI, 
//   (err) => console.log('connected to DB', err)
// )

// app.use('/api/get', require('./routes/getRouter') )
// app.use('/api/auth', require('./routes/authRouter'))
// app.use('/api/admin', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) 
// app.use('/api/admin/yarn', require('./routes/yarnRouter'))
// app.use('/api/admin/inventory', require('./routes/inventoryRouter'))

// app.use((err, req, res, next) => {
//     console.log(err)
//     if(err.name === 'UnauthorizedError'){
//         res.status(err.status)
//       }
//     return res.send({errMsg: err.message})
// })

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
// })
// app.listen(process.env.PORT, () => {
//     console.log('server running on port 7000')
// })