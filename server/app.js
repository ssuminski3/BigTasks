const express = require('express');
const cors = require('cors');
const { jwtCheck } = require('./middleware/auth');
const bigTasksRoutes = require('./routes/bigTasks');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const taskRouter = require('./routes/tasks')
const sprintRouter = require('./routes/sprints')
const app = express();

const corsOptions = {
    origin: 'https://big-tasks-d7jt.vercel.app/',  // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Add the methods you need
    credentials: true,  // If you're using cookies, credentials should be enabled
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(jwtCheck);
app.use(bigTasksRoutes);
app.use(taskRouter)
app.use(sprintRouter)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
