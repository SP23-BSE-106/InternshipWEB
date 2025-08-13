// console.log("Hello, World!")
// var slugify = require('slugify')
// let a = slugify('Hello, World!')
// console.log(a); // Output: hello-world
// const b=slugify('Hello, World!', '__')
// console.log(b); // Output: hello__world
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
