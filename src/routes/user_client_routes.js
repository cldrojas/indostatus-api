const express = require('express');
const router = express.Router();
const user_client_controller = require('../controllers/user_client_controller');

router.get('/api/user_client/get', user_client_controller.get_all);
router.get('/api/user_client/get/:usuario_id', user_client_controller.get_for_id);
router.post('/api/user_client/save', user_client_controller.save_client);
router.post('/api/user_client/update/', user_client_controller.update_client);
router.get('/api/user_client/delete/:usuario_id', user_client_controller.delete_client);
router.get('/api/user_client/get_delete_client', user_client_controller.get_delete_client);
router.get('/api/user_client/active/:usuario_id', user_client_controller.active_delete_client);

module.exports = router;