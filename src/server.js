import express from 'express'

const app = express();

// Routers
import IndexRouter from './routes/index.routes';
import TaskRouter from './routes/task.routes';

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(IndexRouter);
app.use('/api/task', TaskRouter);
/*app.get('/', (req, res) => {
    res.send('Initial route');
});*/
export default app;