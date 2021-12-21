const user_client_controller = {}
const user_client_model = require('../model/user_client_model');
const validation = require('../config/validation');


user_client_controller.get_all = async (req, res) => {
    await user_client_model.get_all()
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}
user_client_controller.get_for_id = async (req, res) => {
    await user_client_model.get_for_id(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });;
}

user_client_controller.save_client = async (req, res) => {
    if (await validation.save_client(req.body)) {
        await user_client_model.save_client(req)
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

user_client_controller.update_client = async (req, res) => {
    if (await validation.update_client(req.body)) {
        await user_client_model.update_client(req)
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

user_client_controller.delete_client = async (req, res) => {
    await user_client_model.delete_client(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

user_client_controller.get_delete_client = async (req, res) => {
    await user_client_model.get_delete_client()
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}

user_client_controller.active_delete_client = async (req, res) => {
    await user_client_model.active_delete_client(req)
        .then((respond) => {
            res.json(respond);
        })
        .catch((err) => {
            res.json(err);
        });
}



module.exports = user_client_controller;