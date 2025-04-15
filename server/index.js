require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios');
const { addBigTaskDb, addTaskToDb, editBigTaskDb } = require('./addingToDb');


const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Authentication middleware
const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_BASEURL,
    tokenSigningAlg: process.env.AUTH0_ALGO
});
app.use(jwtCheck);

// Define routes BEFORE error middleware
app.post('/createbigtask', async (req, res) => {
    console.log("SUPER");
    console.log("Received PUT /createbigtask", req.body);
    try {
        // Example code to add a big task to the database
        const id = await addBigTaskDb({ name: req.body.name, done: req.body.done });
        req.body.tasks.forEach(task => addTaskToDb({name: task.name, done: task.done, bigTaskId: id}))
        console.log(id);
        res.status(200).send("Task created successfully");
    } catch (error) {
        console.error("Failed to create task:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.put('/editbigtask', async (req, res) => {
    console.log("Received PUT /editbigtask", req.body);
    try {
        await editBigTaskDb(req.body.id, {name: req.body.name, done: req.body.done})
        res.status(200).send("Worked")
    }
    catch (error) {
        console.error("Failed to create task:", error.message);
        res.status(500).send("Internal Server Error");
    }
})

// 404 Not Found Middleware (catch-all for routes not defined)
app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    res.status(status).send(message);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/createbigtask/`);
});