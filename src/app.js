// Use import to import libraries
import express from 'express';
import router from './routes';
import projects from './controllers/projects';
import projectsValidation from './validations/projects';

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);
app.get('/projects', projects.getAllProjects);
app.post('/projects/createProject', projectsValidation.validateCreation, projects.createProject);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

export default app;
