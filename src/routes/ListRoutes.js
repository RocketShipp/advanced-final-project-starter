import express from 'express';
import ListController from '../controllers/ListController';

const router = express.Router();

router.post('/lists', ListController.create);


router.put('/lists/:id', ListController.update);

router.get('/lists', ListController.show);

router.get('/lists/:id', ListController.specificList);

router.delete('/lists/:id', ListController.remove);

export default router;
