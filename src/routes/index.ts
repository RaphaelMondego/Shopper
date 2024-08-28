import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController';
import { confirmMeasure } from '../controllers/confirmControllers';
import { listMeasures } from '../controllers/listController';

const router = Router();

router.post('/upload', uploadImage);
router.patch('/confirm', confirmMeasure);
router.get('/:customer_code/list', listMeasures);

export default router;
