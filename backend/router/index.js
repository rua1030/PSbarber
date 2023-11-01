const Cliente = require('../router/cliente/routerCliente')

function responsiApi(app){

    app.use('/cliente', Cliente)
}

module.exports=responsiApi;