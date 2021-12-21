const horario_model = {};
const db = require('../database');
const state = require('../config/state');

horario_model.get_all = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT h.horario_id, h.horario_inicio, h.horario_termino FROM horario AS h WHERE h.estado_id = ?";
        db.query(sql, [state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

horario_model.get_for_id = (req) => {
    return new Promise((resolve, reject) => {
        const { horario_id } = req.params;
        const sql = "SELECT FROM h.horario_inicio, h.horario_termino horario AS h WHERE h.horario_id = ? AND h.estado_id = ?";

        db.query(sql, [horario_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

horario_model.save_horario = (req) => {
    return new Promise((resolve, reject) => {
        const { horario_inicio, horario_termino } = req.body;
        const sql = "INSERT INTO horario (horario_inicio, horario_termino, estado_id) VALUES (?, ?, ?)";

        db.query(sql, [horario_inicio, horario_termino, state.active], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

horario_model.update_horario = (req) => {
    return new Promise((resolve, reject) => {
        const { horario_id, horario_inicio, horario_termino } = req.body;
        const sql = "UPDATE horario SET horario_inicio = ?, horario_termino = ? WHERE horario_id = ? AND estado_id = ?";

        db.query(sql, [horario_inicio, horario_termino, horario_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

horario_model.delete_horario = (req) => {
    return new Promise((resolve, reject) => {
        const { horario_id } = req.params;
        const sql = "UPDATE horario SET estado_id = ? WHERE horario_id = ? AND estado_id = ?";

        db.query(sql, [state.delete, horario_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

horario_model.get_delete_horario = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT h.horario_inicio, h.horario_termino FROM horario AS h WHERE h.estado_id = ?";
        db.query(sql, [state.delete], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

horario_model.active_horario_delete = (req) => {
    return new Promise((resolve, reject) => {
        const { horario_id } = req.params;
        const sql = "UPDATE horario SET estado_id = ? WHERE horario_id = ? AND estado_id = ?";
        db.query(sql, [state.active, horario_id, state.delete], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

horario_model.exist_horario = (horario_inicio, horario_termino) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT h.horario_inicio, horario_termino FROM horario AS h WHERE h.horario_inicio = ? AND h.horario_termino = ? AND h.estado_id = ?";
        
        db.query(sql, [horario_inicio, horario_termino, state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject(false);
            }
        });
    });
}

module.exports = horario_model;