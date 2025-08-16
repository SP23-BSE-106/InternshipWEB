// Switch to (or create if it doesn't exist) a database named "CurdDb"
use("CurdDb")

// Insert multiple course documents into the "courses" collection
db.courses.insertMany([
    { name: "JavaScript", price: 10, author: "John Doe" },   // A JavaScript course
    { name: "Python", price: 15, author: "Jane Smith" },     // A Python course
    { name: "Java", price: 20, author: "Alice Johnson" }     // A Java course
])

// Count how many courses have price = 10
let count = db.courses.countDocuments({ price: 10 })

// Print the result in the MongoDB shell
print("Number of courses with price 10:", count)

db.courses.updateOne(
    { name: "JavaScript" },  // Filter to find the course by name   
    { $set: { price: 12 } }   // Update the price to 12
)   