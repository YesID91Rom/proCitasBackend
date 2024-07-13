const Proveedor = require('../models/Proveedor');

// funcion agragar Proveedor
exports.agregarProveedores = async(req, res) => {

    try {
        
    let proveedores;
    proveedores = new Proveedor(req.body)
    await proveedores.save();
    res.send(proveedores)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar un proveedor')
    }
}

// funcion que nos va a mostrar todos los clientes

exports.mostrarProveedores = async(req, res) =>{
    
    try {

        const proveedores = await Proveedor.find();
        res.json(proveedores);

    } catch (error) {

        console.log(error);

        res.status(500).send('Hubo un error al mostrar los proveedores');
    }
} 

//funcion para mostrar un proveedor

exports.buscarProveedores = async(req, res) =>{

    try {

        let proveedor = await Proveedor.findById(req.params.id);

        if(!proveedor){
            res.status(404).json({ msg:'No se encuentra el proveedor'})
        }else{
            res.json(proveedor);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al consultar el proveedor')
    }
}

//esta funcion es para actualizar un proveedor

exports.actualizarProveedores = async(req, res) => {
    try {
        const proveedor = await Proveedor.findOneAndUpdate(
            { _id: req.params.id },req.body);

            if (!proveedor) res.status(404).send("Proveedor no encontrado");
            else
            res.json(proveedor);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error al actualizar el proveedor");
    }
};



exports.modificarProveedores = async(req, res) =>{

    try {
        const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!proveedor) {
            return res.status(404).send('Proveedor no encontrado');            
        }        
        res.json(proveedor)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el proveedor');        
    }
}

exports.eliminarProveedores = async(req, res) =>{

    try {
        let proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).send('Proveedor no encontrado');            
        }else{
            await Proveedor.findOneAndDelete({_id: req.params.id});
            res.json({msg:"El proveedor ha sido eliminado"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el proveedor');        
    }
}