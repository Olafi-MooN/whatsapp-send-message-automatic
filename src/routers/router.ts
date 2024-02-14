import express from 'express';
import * as HomeController from '../controllers/HomeController';
import { upload } from '../utils/multer';

const router = express.Router();

router.get('/', HomeController.home);
router.get('/home2', HomeController.home2);
router.post('/send-message', upload.single('file'), HomeController.sendMessage);

export { router };
