const Cliente = require('../../models/cliente/modelCliente');

// Funcion para traer el listado de la tabla clientes
async function listarCliente(req, res){

    try {
        const cliente = await Cliente.findAll();
        res.json(cliente);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clientes' });
      }
    }

    //Función para crear un nuevo cliente en la tabla clientes
async function crearCliente(req, res){
  const dataCliente=req.body;
  try {
    const cliente = await Cliente.create({
      id_Cliente:dataCliente.id_Cliente,
      nombre:dataCliente.nombre,
      apellidos:dataCliente.apellidos,
      telefono:dataCliente.telefono,
      tipo_documento:dataCliente.tipo_documento,
      documento:dataCliente.documento,
      email:dataCliente.email,
      estado: 1
    });
    res.status(201).json(cliente)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
 }

 //Función para actualizar un cliente, primero llamamos los datos del cliente especifico mediante el id y despues los actualizamos
async function actualizarCliente(req, res){
    const { id } = req.params;
    const { 
      id_Cliente,
      nombre,
      apellidos,
      telefono,
      tipo_documento,
      documento,
      email,
      estado } = req.body;

      // Validación de que ese cliente si exista
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).send('Cliente no encontrado');
      }
  
      cliente.id_Cliente = id_Cliente;
      cliente.nombre = nombre;
      cliente.apellidos = apellidos;
      cliente.telefono=telefono;
      cliente.tipo_documento= tipo_documento;
      cliente.documento=documento;
      cliente.email=email;
      cliente.estado=estado;
  
      await cliente.save();
  
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).send('Error al actualizar el cliente');
    }
   }

   // Función para eliminar un cliente mediante el parametro del id 
async function eliminarCliente(req,res){
  try {
    const id = req.params.id;

    // Validación de que ese cliente si exista
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    await cliente.destroy();

    res.json({ message: 'Cliente eliminado' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
}

}


module.exports={
    listarCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}