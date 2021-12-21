const genero_controller = {}
const genero_model = require('../model/genero_model');
const validation = require('../config/validation');

genero_controller.get_all = async (req, res) => {
    await genero_model.get_all()
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

genero_controller.get_for_id = async (req, res) => {
    await genero_model.get_for_id(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

genero_controller.save_genero = async (req, res) => {
    if (await validation.create_genero(req.body)) {
        await genero_model.save_genero(req)
            .then((respond) => {
                res.json(respond);
            })
            .catch((err) => {
                res.json(err);
            });
    }
}

genero_controller.update_genero = async (req, res) => {
    if (await validation.create_genero(req.body)) {
        await genero_model.update_genero(req)
            .then((respond) => {
                res.json(respond);
            })
            .catch((err) => {
                res.json(err);
            });
    }
}

genero_controller.delete_genero = async (req, res) => {
    await genero_model.delete_genero(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

genero_controller.get_delete_genero = async (req, res) => {
    await genero_model.get_delete_genero()
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

genero_controller.active_delete_genero = async (req, res) => {
    await genero_model.active_delete_genero(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

module.exports = genero_controller;