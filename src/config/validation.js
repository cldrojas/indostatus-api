const validation = {}
const regex = require('./regex');
const rol_model = require('../model/rol_model');
const user_worker_model = require('../model/user_worker_model');
const user_client_model = require('../model/user_client_model');
const genero_model = require('../model/genero_model');
const horario_model = require('../model/horario_model');

validation.create_rol = async (data) => {
    const { nombre } = data;

    const r = await rol_model.exist_rol(nombre)
        .then((respond) => {
            if (respond.length >= 1) {
                return true;
            }
        })
        .catch((data) => {
            console.log(data);
        });

    if (r) { return false; }
    else if (nombre.length < 4) { return false; }
    else if (nombre.length > 50) { return false; }
    else if (!regex.letters.test(nombre)) { return false; }

    return true;
}

validation.create_genero = async (data) => {
    const { nombre } = data;

    const g = await genero_model.exist_genero(nombre)
        .then((respond) => {
            if (respond.length >= 1) {
                return true;
            }
        })
        .catch((data) => {
            console.log(data);
        });

    if (g) { return false; }
    if (nombre.length < 4) { return false; }
    else if (nombre.length > 50) { return false; }
    else if (!regex.letters.test(nombre)) { return false; }

    return true;
}

validation.create_worker = async (data) => {
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
        horario
    } = data;

    const t = await user_worker_model.exist_worker(nombre, apellido, correo)
        .then((respond) => {
            if (respond.length >= 1) {
                return true;
            }
        })
        .catch((data) => {
            console.log(data);
        });

    if (t) {
        return false;
    }

    if (nombre.length < 4) { return false; }
    else if (nombre.length > 100) { return false; }
    else if (!regex.letters.test(nombre)) { return false; }

    if (apellido.length < 4) { return false; }
    else if (apellido.length > 100) { return false; }
    else if (!regex.letters.test(apellido)) { return false; }

    if (!regex.email.test(correo)) { return false; }

    if (telefono.length > 9) { return false; }
    else if (telefono.length < 9) { return false; }
    else if (!regex.numbers.test(telefono)) { return false; }

    if (direccion.length < 4) { return false; }
    else if (direccion.length > 100) { return false; }

    // if (!regex.photos.test(foto.name)) { return false; }

    if (genero === 0) { return false; }

    if (rol === 0) { return false; }

    if (horario === 0) { return false; }

    return true;
}

validation.update_worker = async (data) => {
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
        horario
    } = data;

    const t = await user_worker_model.exist_worker(nombre, apellido, correo)
        .then((respond) => {
            if (respond.length >= 1) {
                return true;
            }
        })
        .catch((data) => {
            console.log(data);
        });

    if (t) {
        if (nombre.length < 4) { return false; }
        else if (nombre.length > 100) { return false; }
        else if (!regex.letters.test(nombre)) { return false; }

        if (apellido.length < 4) { return false; }
        else if (apellido.length > 100) { return false; }
        else if (!regex.letters.test(apellido)) { return false; }

        if (!regex.email.test(correo)) { return false; }

        if (telefono.length > 9) { return false; }
        else if (telefono.length < 9) { return false; }
        else if (!regex.numbers.test(telefono)) { return false; }

        if (direccion.length < 4) { return false; }
        else if (direccion.length > 100) { return false; }

        // if (!regex.photos.test(foto.name)) { return false; }

        if (genero === 0) { return false; }

        if (rol === 0) { return false; }

        if (horario === 0) { return false; }
    } else {
        return false;
    }

    return true;
}

validation.create_client = async (data) => {
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
        apodo
    } = data;

    const c = await user_client_model.exist_client(correo)
        .then((respond) => {
            if (respond.length >= 1) {
                return true;
            }
        })
        .catch((data) => {
            console.log(data);
        });

    if (c) { return false; }

    if (nombre.length < 4) { return false; }
    else if (nombre.length > 100) { return false; }
    else if (!regex.letters.test(nombre)) { return false; }

    if (apellido.length < 4) { return false; }
    else if (apellido.length > 100) { return false; }
    else if (!regex.letters.test(apellido)) { return false; }

    if (!regex.email.test(correo)) { return false; }

    if (telefono.length > 9) { return false; }
    else if (telefono.length < 9) { return false; }
    else if (!regex.numbers.test(telefono)) { return false; }

    if (direccion.length < 4) { return false; }
    else if (direccion.length > 100) { return false; }

    // if (!regex.photos.test(foto.name)) { return false; }

    if (genero === 0) { return false; }

    if (apodo.length < 4) { return false; }
    if (apodo.length > 100) { return false; }

    return true;
}

validation.update_client = async (data) => {
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
        apodo
    } = data;

    const c = await user_client_model.exist_client(correo)
        .then((respond) => {
            if (respond.length >= 1) {
                return true;
            }
        })
        .catch((data) => {
            console.log(data);
        });

    if (c) {
        if (nombre.length < 4) { return false; }
        else if (nombre.length > 100) { return false; }
        else if (!regex.letters.test(nombre)) { return false; }

        if (apellido.length < 4) { return false; }
        else if (apellido.length > 100) { return false; }
        else if (!regex.letters.test(apellido)) { return false; }

        if (!regex.email.test(correo)) { return false; }

        if (telefono.length > 9) { return false; }
        else if (telefono.length < 9) { return false; }
        else if (!regex.numbers.test(telefono)) { return false; }

        if (direccion.length < 4) { return false; }
        else if (direccion.length > 100) { return false; }

        // if (!regex.photos.test(foto.name)) { return false; }

        if (genero === 0) { return false; }

        if (apodo.length < 4) { return false; }
        if (apodo.length > 100) { return false; }
    } else {
        return false;
    }

    return true;
}

validation.horario = async (data) => {
    const { horario_inicio, horario_termino } = data;

    const h = await horario_model.exist_horario(horario_inicio, horario_termino)
    .then((respond) => {
        if (respond.length >= 1) {
            return true;
        }
    })
    .catch((data) => {
        console.log(data);
    });

    if (h) { return 1; }
    return 1000;
}

module.exports = validation;

