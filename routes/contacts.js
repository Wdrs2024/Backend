import express from 'express';
import { handleContactForm } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contacts
router.post('/', handleContactForm);

export default router;
