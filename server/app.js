const express = require('express');
const cors = require('cors');
const { jwtCheck } = require('./middleware/auth');
const bigTasksRoutes = require('./routes/bigTasks');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const taskRouter = require('./routes/tasks')
const app = express();

app.use(cors());
app.use(express.json());
app.use(jwtCheck);
app.use(bigTasksRoutes);
app.use(taskRouter)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
