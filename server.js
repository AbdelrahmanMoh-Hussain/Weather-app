// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

app.get('/all', (req, res) => {
    console.log("GET: " + projectData);
    res.send(projectData);
})
app.post('/add', (req, res) => {
    const newData = req.body;
    console.log(newData);
    projectData.temp = newData.temp;
    projectData.date = newData.date;
    projectData.content = newData.content;
    console.log(projectData);
    res.send({success: true});
})