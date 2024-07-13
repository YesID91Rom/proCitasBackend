const express = require('express');
const conectarBD = require('../config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//Llamamos nuestra funcion conectaBD
conectarBD();
app.use(cors());

//habilitamos exxpress json
app.use(express.json({extended: true}));

//rutas de aplicacion 

app.use('/api/citas', require('../routes/citasRuta'));
app.use('/api/clientes', require('../routes/cliente'));
app.use('/api/proveedores', require('../routes/proveedor'));
app.use('/api/auth', require('../routes/auth'));
app.use('/api/usuarios', require('../routes/usuarios'));


//rutas de prueba y configuracion
app.get('/',(req,res) =>{
    res.send("Bienvenidos estamos desde el navegador")
});
app.listen(port, () => console.log("Estamos conectados desde el servidor con el puerto: ", port));