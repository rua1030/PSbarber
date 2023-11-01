const Cliente = require('../router/cliente/routerCliente')

// Crea las rutas de cada modulo
function responsiApi(app){

    app.use('/cliente', Cliente)
}

module.exports=responsiApi;