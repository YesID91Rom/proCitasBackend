const Usuario = require('../models/Usuario');
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
    // vamos a revisar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    const {email, password} = req.body;
    try {

        //revisar que el usuario registradoi sea unico
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: "El usuario ya existe"});
        }
        //creamos el nuevo usuario
        usuario = new Usuario(req.body);
        //encriptar la contraseña 
        usuario.password = await bcryptjs.hash(password, 10);
        //guardar el usuario en la base de datos
        await usuario.save();
        //crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        jwt.sign(payload, process.env.SECRETA, { //buscar la palabra secreta
            expiresIn: 3600  // durara 1 hora
        }, (error, token) => {
            if(error) throw error;
            res.json({token}); // mensaje de confirmacion
        });
        
    } catch (error) {
        console.log("Hubo un error");
        console.log(error);
        res.status(400).send("Hubo un error");
    }
};