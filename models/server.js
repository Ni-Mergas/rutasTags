
const express = require('express');
const cors = require('cors');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.categoriesPath = '/api/categories';
        this.routes();
    }

    listen(){
        console.log('Iniciando app');
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto: ', this.port);
        })
    }

    //Middlewares

    middlewares(){
        //cors
        this.app.use( cors() );

        //Lectura y parseo del body, por ahora JSON, OJO QUE DEBE SER CSV

        this.app.use(express.json());
    }

    //Rutas

    routes () {
        this.app.use(this.categoriesPath, require('../routes/categories'));
    }

}


module.exports = Server;