const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

exports.AutenticarUsuario = async (req, res) => {
    // vamos a revisar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    const {email, password} = req.body;

    try {
        // revisar si el usuario esta registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: "El usuario no existe"});
        }
        //revisamos el password
        //comparamos la contraseña con la que esta en la base de datos
        const passCorrecto = bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: "La contraseña es incorrecta"});
        }

        //si todo esta correcto, creamos y firmarmamos el token
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;
            res.json({token});//mensaja de confirmacion
        });
    } catch (error) {
        console.log("Hubo un error");
        console.log(error);
        res.status(400).send("Hubo un error");
    }
}

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Hubo un error"});
    }
}