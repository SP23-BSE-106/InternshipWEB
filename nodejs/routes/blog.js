const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.send('Birds home page');
});

// About route
router.get('/about', (req, res) => {
  res.send('About birds');
});

// Blog post with slug
router.get('/blogpost/:slug', (req, res) => {
  res.send(`Blog post: for ${req.params.slug}`);
});

module.exports = router;
