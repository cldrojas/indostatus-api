const express = require("express");
const router = express.Router();
const rol_controller = require("../controllers/rol_controller");

router.get("/api/rol/get", rol_controller.get_all);
router.get("/api/rol/get/:rol_id", rol_controller.get_for_id);
router.post("/api/rol/save", rol_controller.save_rol);
router.post("/api/rol/update/", rol_controller.update_rol);
router.get("/api/rol/delete/:rol_id", rol_controller.delete_rol);
router.get("/api/rol/get_delete_rol", rol_controller.get_delete_rol);
router.get("/api/rol/active/:rol_id", rol_controller.active_delete_rol);

module.exports = router;
