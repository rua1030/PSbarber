const express = require('express');
const responsiApi = require('./router/index');
const cors = require('cors');
const app = express();

//Uso de archivos json con express
app.use(express.json());

//Intercambio de recursos
app.use(cors())

responsiApi(app)

//Servidor
app.listen(4000, ()=>{
    console.log('Servidor respondiendo por el puerto 4000')
})
