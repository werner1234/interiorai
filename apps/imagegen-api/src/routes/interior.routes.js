import express from 'express';
import interiorController from '../controllers/interior.controller';

const router = express.Router();

// Define your routes here
router.post("/", interiorController.generateImage);

export default router;
