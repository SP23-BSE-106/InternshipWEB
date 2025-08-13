//const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<h1>Hello World</ h1>');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
// import { a } from './mymodule.js';
// import obj from './mymodule.js';
// console.log(obj); // Output: { x: 5, y: 7 }// console.log(a); // Output: 1
const a = require('./mymodule.js');
console.log(a); // Output: 1