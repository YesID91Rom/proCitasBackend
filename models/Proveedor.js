const mongoose = require ('mongoose');

//el modelo a implementar debe ser el mismo a la base de datos

const proveedoresSchema = mongoose.Schema({

    nombreProveedor: {
        type: String,
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

    },
    pais: {
        type: String,
        require: true

    }

},{versionkey: false});

module.exports = mongoose.model('Proveedores', proveedoresSchema);
