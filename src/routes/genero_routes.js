const express = require('express');
const router = express.Router();
const genero_controller = require('../controllers/genero_controller');

router.get('/api/genero/get', genero_controller.get_all);
router.get('/api/genero/get/:genero_id', genero_controller.get_for_id);
router.post('/api/genero/save', genero_controller.save_genero);
router.post('/api/genero/update/', genero_controller.update_genero);
router.get('/api/genero/delete/:genero_id', genero_controller.delete_genero);
router.get('/api/genero/get_delete_genero', genero_controller.get_delete_genero);
router.get('/api/genero/active/:genero_id', genero_controller.active_delete_genero);

module.exports = router;