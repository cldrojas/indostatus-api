const rol_model = {};
const db = require("../database");
const state = require("../config/state");

rol_model.get_all = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.rol_id, r.rol_nombre, e.estado_nombre FROM rol AS r INNER JOIN estado AS e ON r.estado_id = e.estado_id WHERE r.estado_id = ?";
    db.query(sql, [state.active], (err, rows, fields) => {
      if (!err) {
        resolve(rows);
      } else {
        reject({ Error: err });
      }
    });
  });
};

rol_model.get_for_id = (req) => {
  return new Promise((resolve, reject) => {
    const { rol_id } = req.params;
    const sql =
      "SELECT r.rol_id, r.rol_nombre, e.estado_nombre FROM rol AS r INNER JOIN estado AS e ON r.estado_id = e.estado_id WHERE r.rol_id = ? AND r.estado_id = ?";
    db.query(sql, [rol_id, state.active], (err, rows, fields) => {
      if (!err) {
        resolve(rows[0]);
      } else {
        reject({ Status: 500 });
      }
    });
  });
};

rol_model.save_rol = (req) => {
  return new Promise((resolve, reject) => {
    const { nombre } = req.body;
    const query = "INSERT INTO rol (rol_nombre, estado_id) VALUES (?, ?)";

    db.query(query, [nombre, state.active], (err, rows, fields) => {
      if (!err) {
        resolve({ Status: 200 });
      } else {
        reject({ Status: 500 });
      }
    });
  });
};

rol_model.update_rol = (req) => {
  return new Promise((resolve, reject) => {
    const { rol_id, nombre } = req.body;
    const query =
      "UPDATE rol AS r SET r.rol_nombre = ? WHERE r.rol_id = ? AND r.estado_id = ?";

    db.query(query, [nombre, rol_id, state.active], (err, rows, fields) => {
      if (!err) {
        resolve({ Status: 200 });
      } else {
        reject({ Status: 500 });
      }
    });
  });
};

rol_model.delete_rol = (req) => {
  return new Promise((resolve, reject) => {
    const { rol_id } = req.params;
    const query =
      "UPDATE rol AS r SET r.estado_id = ? WHERE r.rol_id = ? AND r.estado_id = ?";

    db.query(
      query,
      [state.delete, rol_id, state.active],
      (err, rows, fields) => {
        if (!err) {
          resolve({ Status: 200 });
        } else {
          reject({ Status: 500 });
        }
      }
    );
  });
};

rol_model.exist_rol = (nombre) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.rol_id FROM rol AS r WHERE r.rol_nombre = ? AND r.estado_id = ?";
    db.query(sql, [nombre, state.active], (err, rows, fields) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(false);
      }
    });
  });
};

rol_model.get_delete_rol = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.rol_id, r.rol_nombre, e.estado_nombre FROM rol AS r INNER JOIN estado AS e ON r.estado_id = e.estado_id WHERE r.estado_id = ?";
    db.query(sql, [state.delete], (err, rows, fields) => {
      if (!err) {
        resolve(rows);
      } else {
        reject({ Status: 500 });
      }
    });
  });
};

rol_model.active_delete_rol = (req) => {
  return new Promise((resolve, reject) => {
    const { rol_id } = req.params;
    const sql =
      "UPDATE rol AS r SET r.estado_id = ? WHERE r.rol_id = ? AND r.estado_id = ?";
    db.query(sql, [state.active, rol_id, state.delete], (err, rows, fields) => {
      if (!err) {
        resolve({ Status: 200 });
      } else {
        reject({ Status: 500 });
      }
    });
  });
};

module.exports = rol_model;
