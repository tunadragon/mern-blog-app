import express from 'express';
import { signin, signup } from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin) // POST route because we send all data to backend
router.post('/signup', signup) 

export default router;