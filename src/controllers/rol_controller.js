const rol_controller = {}
const rol_model = require('../model/rol_model');
const validation = require('../config/validation');

rol_controller.get_all = async (req, res) => {
    await rol_model.get_all()
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        }); 
}

rol_controller.get_for_id = async (req, res) => {
    await rol_model.get_for_id(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        }); 
}

rol_controller.save_rol = async (req, res) => {
    if (await validation.create_rol(req.body)) {
        await rol_model.save_rol(req)
            .then((respond) => {
                res.json(respond);
            })
            .catch((err) => {
                res.json(err);
            }); 
    } else {
        res.json({ Status: 500 });
    }
}

rol_controller.update_rol = async (req, res) => {
    if (await validation.create_rol(req.body)) {
        await rol_model.update_rol(req, res)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        }); 
    } else {
        res.json({ Status: 500 });
    }
}

rol_controller.delete_rol = async (req, res) => { 
    await rol_model.delete_rol(req)
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

rol_controller.get_delete_rol = async (req, res) => {
    await rol_model.get_delete_rol()
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

rol_controller.active_delete_rol = async (req, res) => {
    await rol_model.active_delete_rol(req)
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

module.exports = rol_controller;