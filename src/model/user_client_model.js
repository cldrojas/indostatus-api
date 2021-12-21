const user_client_model = {}
const db = require('../database');
const state = require('../config/state');

user_client_model.get_all = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, u.genero_id FROM cliente AS c INNER JOIN usuario AS u ON c.usuario_id = u.usuario_id WHERE u.estado_id = ?';
        db.query(sql, [state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_client_model.get_for_id = (req, res) => {
    return new Promise((resolve, reject) => {
        const { usuario_id } = req.params;
        const sql = 'SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, u.genero_id FROM cliente AS c INNER JOIN usuario AS u ON c.usuario_id = u.usuario_id WHERE u.usuario_id = ? AND u.estado_id = ?';
        db.query(sql, [usuario_id, state.active], (err, rows, fields) => {
            if (!err) {
                resolve(rows[0]);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_client_model.save_client = async (req) => {
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
            // Cliente
            apodo } = req.body;

        const sql_user = "INSERT INTO usuario (usuario_nombre, usuario_apellido, usuario_correo, usuario_telefono, usuario_direccion, usuario_contrasena, usuario_foto, genero_id, estado_id) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sql_user, [nombre, apellido, correo, telefono, direccion, foto, genero],
            (err, rows, fields) => {
                if (!err) {
                    const usuario_id = rows.insertId;
                    const sql_client = "INSERT INTO cliente (cliente_apodo, usuario_id) VALUES(?,?)";
                    db.query(sql_client, [apodo, usuario_id], (err, rows, fields) => {
                        if (!err) {
                            resolve(rows);
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

user_client_model.update_client = (req) => {
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
            // Cliente
            apodo } = req.body;

        const sql_user = "UPDATE usuario AS u SET u.usuario_nombre = ?, u.usuario_apellido = ?, u.usuario_correo = ?, u.usuario_telefono = ?, u.usuario_direccion = ?, u.usuario_foto = ?, u.genero_id = ? WHERE u.usuario_id = ? AND u.estado_id = ?";
        db.query(sql_user, [nombre, apellido, correo, telefono, direccion, foto, genero, usuario_id, state.active],
            (err, rows, fields) => {
                if (!err) {
                    const sql_client = "UPDATE cliente SET cliente_apodo = ? WHERE usuario_id = ? AND estado_id = ?";
                    db.query(sql_client, [apodo, usuario_id, state.active], (err, rows, fields) => {
                        if (!err) {
                            resolve(rows);
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

user_client_model.delete_client = (req) => {
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

user_client_model.get_delete_client = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT u.usuario_id, u.usuario_nombre, u.usuario_apellido, u.usuario_foto FROM cliente AS c INNER JOIN usuario AS u ON c.usuario_id = u.usuario_id WHERE u.estado_id = ?";
        db.query(sql, [state.delete], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject({ Status: 500 });
            }
        });
    });
}

user_client_model.active_delete_client = (req) => {
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

user_client_model.exist_client = (correo) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT u.usuario_id FROM cliente AS c INNER JOIN usuario AS u ON c.usuario_id = u.usuario_id WHERE u.usuario_correo = ?";
        db.query(sql, [correo], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                reject(false);
            }
        });
    });
}

module.exports = user_client_model;