const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    //leer el token de header
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Acceso denegado, no se ha enviado el token");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).send("Token no válido");
    }


    //revisar si tenemos un token
    if (!token) {
        return res.status(400).json ({msg:"no hay un token, permiso no valido"})
    }


    //validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(400).json({msg:"Token no válido"});
    }
}