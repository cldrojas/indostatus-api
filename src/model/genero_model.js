const genero_model = {}
const db = require('../database');
const state = require('../config/state');

genero_model.get_all = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT g.genero_id, g.genero_nombre FROM genero AS g WHERE g.estado_id = ?';
        db.query(sql, [state.active],(err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

genero_model.get_for_id = (req) => {
    return new Promise((resolve, reject) => {
        const { genero_id } = req.params;
        const sql = 'SELECT g.genero_id, g.genero_nombre FROM genero AS g WHERE g.genero_id = ? AND g.estado_id = ?';
        db.query(sql, [genero_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows[0]);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

genero_model.save_genero = (req) => {
    return new Promise((resolve, reject) => {
        const { nombre } = req.body;
        const query = 'INSERT INTO genero (genero_nombre, estado_id) VALUES (?, ?)';
    
        db.query(query, [nombre, state.active], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

genero_model.update_genero = (req) => {
    return new Promise((resolve, reject) => {
        const { genero_id, nombre } = req.body;
        const query = 'UPDATE genero AS g SET g.genero_nombre = ? WHERE g.genero_id = ? AND g.estado_id = ?';
    
        db.query(query, [nombre, genero_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

genero_model.delete_genero = (req) => {
    return new Promise((resolve, reject) => {
        const { genero_id } = req.params;
        const query = 'UPDATE genero AS g SET g.estado_id = ? WHERE g.genero_id = ? AND g.estado_id = ?';
    
        db.query(query, [state.delete, genero_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

genero_model.exist_genero = (nombre) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT g.genero_id FROM genero AS g WHERE g.genero_nombre = ? AND g.estado_id = ?";
        db.query(sql, [nombre, state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject(false);
            }
        });
    });
}

genero_model.get_delete_genero = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT g.genero_id, g.genero_nombre FROM genero AS g WHERE g.estado_id = ?";
        db.query(sql, [state.delete], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

genero_model.active_delete_genero = (req) => {
    return new Promise((resolve, reject) => {
        const { genero_id } = req.params;
        const sql = "UPDATE genero AS g SET g.estado_id = ? WHERE g.genero_id = ? AND g.estado_id = ?";
        db.query(sql, [state.active, genero_id, state.delete], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

module.exports = genero_model;