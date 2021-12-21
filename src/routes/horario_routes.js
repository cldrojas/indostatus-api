const express = require('express');
const router = express.Router();
const horario_controller = require('../controllers/horario_controller');

router.get('/api/horario/get', horario_controller.get_all);
router.get('/api/horario/get/:horario_id', horario_controller.get_for_id);
router.post('/api/horario/save', horario_controller.save_horario);
router.post('/api/horario/update/', horario_controller.update_horario);
router.get('/api/horario/delete/:horario_id', horario_controller.delete_horario);
router.get('/api/horario/get_delete_horario', horario_controller.get_delete_horario);
router.get('/api/horario/active/:horario_id', horario_controller.active_delete_horario);

module.exports = router;