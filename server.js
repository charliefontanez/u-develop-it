const express = require('express');
const db = require('./db/connection');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

// Sets up connection to the database

// Catch all route
app.use((req, res) => {
  res.status(404).end();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
  });
})