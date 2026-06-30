import express from 'express';
import whatsappWebhookController from '../controllers/whatsappWebhook.controller.js';

const router = express.Router();

router.get('/', whatsappWebhookController.verificarWebhook);
router.post('/', whatsappWebhookController.receberWebhook);

export default router;