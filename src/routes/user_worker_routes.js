const express = require('express');
const router = express.Router();
const user_worker_controller = require('../controllers/user_worker_controller');

router.get('/api/user_worker/get', user_worker_controller.get_all);
router.get('/api/user_worker/get/:usuario_id', user_worker_controller.get_user_for_id);
router.post('/api/user_worker/save', user_worker_controller.save_worker);
router.post('/api/user_worker/update/', user_worker_controller.update_worker);
router.get('/api/user_worker/delete/:usuario_id', user_worker_controller.delete_worker);
router.get('/api/user_worker/get_delete_worker', user_worker_controller.get_delete_worker);
router.get('/api/user_worker/active/usuario_id', user_worker_controller.active_delete_worker);

module.exports = router;