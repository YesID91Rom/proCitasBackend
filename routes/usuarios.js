const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const {check} = require("express-validator");

//creamos la ruta del crud
//tenemos que crear el usuario
// api/usuarios

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({min:10})
],//
    usuariosController.crearUsuario
);
module.exports = router;