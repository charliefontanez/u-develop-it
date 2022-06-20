const express = require('express');
const db = require('./db/connection');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for routes not found
app.use((req, res) => {
  res.status(404).end();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
  });
})