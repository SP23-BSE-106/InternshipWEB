const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// POST route
app.post('/', (req, res) => {
  console.log("POST request received with body:", req.body);
  res.send('Data received!');
  console.log("HEY THERE ITS A POST REQUEST");
});

// Import and use blog router
const blogRoutes = require('./routes/blog.js');
app.use('/blog', blogRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
