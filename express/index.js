var express=require('express');
var app=express();


app.get('/', (req, res) => {
    res.send("Hello world lets get started with node js");
});

app.get('/home', (req, res) => {
    res.send("Munazza Javed");
});

app.get('/help', (req, res) => {
    res.send("welcome");
});

app.get('/hi', (req, res) => {
    res.send("Good morning");
});



app.get('/factorial', (req, res) => {
    let n = parseInt(req.query.t1);

    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }

    res.send(`Factorial of ${n} is ${fact}`);
});

let PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});