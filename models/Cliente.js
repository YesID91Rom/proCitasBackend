const mongoose = require('mongoose');

//el modelo a implementar debe ser el mismo a la base de datos

const clienteSchema = mongoose.Schema({

    nombres: {
        type: String,
        require: true

    },
    apellidos: {
        type: String,
        require: true

    },
    cedula: {
        type: Number,
        require: true

    },
    correo: {
        type: String,
        require: true

    },
    numeroContacto: {
        type: Number,
        require: true

    },
    nit: {
        type: Number,
        require: true

    },
    direccion: {
        type: String,
        require: true

    }

},{versionkey: false}
);

module.exports = mongoose.model('Cliente', clienteSchema);