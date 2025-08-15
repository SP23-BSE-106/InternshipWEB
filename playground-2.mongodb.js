/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('courses').insertMany([
[
  { item: 'Alice Johnson', price: 85, quantity: 3, date: new Date('2023-03-01T08:00:00Z') }, // 85 marks, 3 subjects
  { item: 'Bob Smith', price: 92, quantity: 4, date: new Date('2023-03-01T09:00:00Z') },
  { item: 'Charlie Lee', price: 78, quantity: 5, date: new Date('2023-03-15T09:00:00Z') },
  { item: 'Charlie Lee', price: 82, quantity: 5, date: new Date('2023-04-04T11:21:39.736Z') },
  { item: 'Alice Johnson', price: 88, quantity: 3, date: new Date('2023-04-04T21:23:13.331Z') },
  { item: 'David Kim', price: 90, quantity: 2, date: new Date('2024-06-04T05:08:13Z') },
  { item: 'David Kim', price: 95, quantity: 2, date: new Date('2024-09-10T08:43:00Z') },
  { item: 'Alice Johnson', price: 91, quantity: 3, date: new Date('2025-02-06T20:20:13Z') }
]
]);


// Print a message to the output window.
console.log(`Inserted documents into the 'courses' collection.`);

