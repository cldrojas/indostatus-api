const user_worker_model = {}
const db = require('../database');
const state = require('../config/state');
const bcryptjs = require('bcryptjs');

user_worker_model.get_all = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, u.genero_id FROM trabajador AS t INNER JOIN usuario AS u ON t.usuario_id = u.usuario_id WHERE u.estado_id = ?';
        db.query(sql, [state.active],(err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_worker_model.get_for_id = (req) => {
    return new Promise((resolve, reject) => {
        const { usuario_id } = req.params;
        const sql = 'SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, u.genero_id FROM trabajador AS t INNER JOIN usuario AS u ON t.usuario_id = u.usuario_id WHERE u.usuario_id = ? AND u.estado_id = ?';
        db.query(sql, [usuario_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows[0]);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_worker_model.save_worker = (req) => {
    return new Promise((resolve, reject) => {
        const {
            // Usuario
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            foto,
            genero,
            // Trabajador
            rol,
            horario } = req.body;

        const password = bcryptjs.hashSync('lefufu123', 12);

        const sql_user = "INSERT INTO usuario (usuario_nombre, usuario_apellido, usuario_correo, usuario_telefono, usuario_direccion, usuario_contrasena, usuario_foto, genero_id, estado_id) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sql_user,
            [nombre, apellido, correo, telefono, direccion, password,telefono, foto, genero, state.active],
            (err, rows, fields) => {
                if (!err) {
                    const usuario_id = rows.insertId;
                    const sql_worker = "INSERT INTO trabajador (usuario_id, rol_id, horario_id) VALUES (?,?,?)";
                    
                    db.query(sql_worker, [usuario_id, rol, horario], (err, rows, fields) => {
                        if (!err) {
                            resolve({ Status: 200 });
                        } else {
                            reject({ Status: 500 });
                        }
                    });
                } else {
                    reject({ Status: 500 });
                }
            });
    });
}

user_worker_model.update_worker = (req) => {
    return new Promise((resolve, reject) => {
        const {
            // Usuario
            usuario_id,
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            foto,
            genero,
            // Trabajador
            rol,
            horario
        } = req.body;

        const sql_user = "UPDATE usuario AS u SET u.usuario_nombre = ?, u.usuario_apellido = ?, u.usuario_correo = ?, u.usuario_telefono = ?, u.usuario_direccion = ?, u.usuario_foto = ?, u.genero_id = ? WHERE u.usuario_id = ? AND u.estado_id = ?";
        db.query(sql_user, 
            [nombre, apellido, correo, telefono, direccion, foto, genero, usuario_id, state.active],
            (err, rows, fields) => {
                if (!err) {
                    const sql_worker = "UPDATE trabajador AS t SET t.rol_id = ?, t.horario_id = ? WHERE t.usuario_id = ?";
                    db.query(sql_worker, [rol, horario, usuario_id, state.active], (err, rows, fields) => {
                        if (!err) {
                            resolve({ Status: 200 });
                        } else {
                            reject({ Status: 500 });
                        }
                    });
                } else {
                    reject({ Status: 500 });
                }
            });
    });
}

user_worker_model.delete_worker = (req) => {
    return new Promise((resolve, reject) => {
        const { usuario_id } = req.params;
        const sql = "UPDATE usuario AS u SET u.estado_id = ? WHERE u.usuario_id = ? AND u.estado_id = ?";
        db.query(sql, [state.delete, usuario_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_worker_model.get_delete_worker = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, u.usuario_foto, r.rol_nombre FROM trabajador AS t INNER JOIN usuario AS u ON t.usuario_id = u.usuario_id INNER JOIN rol AS r ON t.rol_id = r.rol_id WHERE u.estado_id = ?";
        db.query(sql, [state.delete], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_worker_model.active_delete_worker = (req) => {
    return new Promise((resolve, reject) => {
        const { usuario_id } = req.params;
        const sql = "UPDATE usuario AS u SET u.estado_id = ? WHERE u.usuario_id = ? AND u.estado_id = ?";
        db.query(sql, [state.active, usuario_id, state.delete], (err, rows, fields) => {
            if (!err) {
                resolve({ Status: 200 });
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_worker_model.exist_worker = (nombre, apellido, correo) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT u.usuario_id FROM trabajador AS t INNER JOIN usuario AS u ON t.usuario_id = u.usuario_id WHERE u.usuario_nombre = ? AND u.usuario_apellido = ? AND u.usuario_correo = ?";
        db.query(sql, [nombre, apellido, correo], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject(false);
            }
        });
    });
}

module.exports = user_worker_model;