require('dotenv').config();
const app = require('./app');
const { closeDbConnection } = require('./db/connectToDb');  // This will be your function to close the DB connection

const port = 3000;

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/createbigtask/`);
});

// Handle termination signals to gracefully shut down the server and close DB connections
const shutdown = async () => {
    console.log("Shutting down server...");
    await closeDbConnection(); // Close the DB connection here
    server.close(() => {
        console.log('Server has been shut down.');
        process.exit(0);
    });
};

// Listen for termination signals to trigger shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);