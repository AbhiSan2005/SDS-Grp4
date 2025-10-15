import express from 'express';
import { getProjects, createProject, updateProject, deleteProject, getProjectById} from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', getProjects);

router.post('/', createProject);

router.put('/:id', updateProject);

router.get('/:id', getProjectById);

router.delete('/:id', deleteProject);

export default router;