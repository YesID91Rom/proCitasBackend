const express = require('express');
const router = express.Router();
const proveedorController = require ('../controllers/proveedorController');

//creamos la ruta del crud

router.post('/', proveedorController.agregarProveedores);
router.get('/', proveedorController.mostrarProveedores);
router.get('/:id', proveedorController.buscarProveedores);
router.put('/:id', proveedorController.actualizarProveedores);
//router.patch('/:id', proveedorController.modificarProveedores);
router.delete('/:id', proveedorController.eliminarProveedores);


module.exports = router;
