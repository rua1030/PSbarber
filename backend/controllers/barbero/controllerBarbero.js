const Barbero = require("../../models/barbero/modelBarbero")

async function listarBarberos(req, res){
    try{
        const barbero = await Barbero.findAll();
        res.json(barbero);    
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener barberos'});
    }
}

async function crearBarbero(req, res){
    try{
        const dataBarbero = req.body
        const barberoExistente = await Barbero.findOne({
            where: { documento: dataBarbero.documento },
            where: { email: dataBarbero.email },
        });
        if (barberoExistente) {
            return res.status(400).json({ error: "El barbero ya existe en la base de datos" });
        }
        const barbero = await Barbero.create({

            nombre: dataBarbero.nombre,
            telefono: dataBarbero.telefono,
            documento: dataBarbero.documento,
            email: dataBarbero.email,
            estado:1
        });
        res.status(201).json(barbero)
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Error al crear barbero'});
    }
}

async function actualizarBarbero(req, res){
    try{
        const id = req.params.id;
        const barbero = req.body;
        const barberoExistente = await Barbero.findByPk(id);
        if (!barberoExistente) {
            return res.status(404).json({ error: 'Barbero no encontrado' });
        }
        await barberoExistente.update(
            {
                nombre: barbero.nombre,
                telefono: barbero.telefono,
                documento: barbero.documento,
                email: barbero.email,
                estado:barbero.estado
            },
            {
                where: { documento: barberoExistente.documento }
            }
        );
        res.status(200).json(barbero)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar barbero'});
    }
}

async function eliminarBarbero(req, res) {
    try {
        const id = req.params.id;
        const barbero = await Barbero.findByPk(id);
        if (!barbero) {
            return res.status(404).json({ error: 'Barbero no encontrado' });
        }
        await barbero.destroy();
        res.json({ message: 'Barbero eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar barbero' });
    }
}

async function desactivarBarbero(req, res) {
    try {
        const id = req.params.id;
        const barbero = await Barbero.findByPk(id);
        if (!barbero) {
            return res.status(404).json({ error: 'Barbero no encontrado' });
        }
        await barbero.update({ estado: false });
        res.status(200).json({ message: 'Barbero deshabilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al deshabilitar barbero' });
    }
}
async function activarBarbero(req, res) {
    try {
        const id = req.params.id;
        const barbero = await Barbero.findByPk(id);
        if (!barbero) {
            return res.status(404).json({ error:'Barbero no encontrado'});
        }
        await barbero.update({ estado: true });
        res.status(200).json({ message:'Barbero habilitado exitosamente'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:'Error al habilitar barbero'});
    }
}

module.exports={
    listarBarberos,
    crearBarbero,
    actualizarBarbero,
    desactivarBarbero,
    activarBarbero,
    eliminarBarbero
}