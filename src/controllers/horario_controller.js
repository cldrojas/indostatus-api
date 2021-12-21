const horario_controller = {};
const horario_model = require('../model/horario_model');
const validation = require('../config/validation');

horario_controller.get_all = async (req, res) => {
    await horario_model.get_all()
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

horario_controller.get_for_id = async (req, res) => {
    await horario_model.get_for_id(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

horario_controller.save_horario = async (req, res) => {
    const v = await validation.horario(req.body);
    if (v == 1000) {
        await horario_model.save_horario(req)
            .then((respond) => {
                res.json(respond);
            })
            .catch((err) => {
                res.json(err);
            });
    } else {
        res.json({ Status: v });
    }
}

horario_controller.update_horario = async (req, res) => {
    const v = await validation.horario(req.body);

    if (v  == 1000) {
        await horario_model.update_horario(req)
            .then((respond) => {
                res.json(respond);
            })
            .catch((err) => {
                res.json(err);
            });
    } else {
        res.json({ Status: v });
    }
}

horario_controller.delete_horario = async (req, res) => {
    await horario_model.delete_horario(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

horario_controller.get_delete_horario = async (req, res) => {
    await horario_model.get_delete_horario()
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

horario_controller.active_delete_horario = async (req, res) => {
    await horario_model.active_horario_delete(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

module.exports = horario_controller;