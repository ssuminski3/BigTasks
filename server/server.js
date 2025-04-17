require('dotenv').config();
const app = require('./app');

const port = 3000;

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});