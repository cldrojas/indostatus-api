const user_worker_controller = {}
const user_worker_model = require('../model/user_worker_model');
const validation = require('../config/validation');

user_worker_controller.get_all = async (req, res) => { 
    await user_worker_model.get_all()
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

user_worker_controller.get_user_for_id = async (req, res) => { 
    await user_worker_model.get_for_id(res)
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

user_worker_controller.save_worker = async (req, res) => {
    if (await validation.create_worker(req.body)) {
        await user_worker_model.save_worker(req, res)
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

user_worker_controller.update_worker = async (req, res) => {
    if (await validation.update_worker(req.body)) {
        await user_worker_model.update_worker(req)
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

user_worker_controller.delete_worker = async (req, res) => {
    await user_worker_model.delete_worker(req)
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

user_worker_controller.get_delete_worker = async (req, res) => {
    await user_worker_model.get_delete_worker()
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

user_worker_controller.active_delete_worker = async (req, res) => {
    await user_worker_model.active_delete_worker(req)
    .then((respond) => {
        res.json(respond);
    })
    .catch((err) => {
        res.json(err);
    }); 
}

module.exports = user_worker_controller;