
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.categoriesPath = '/api/categories';
        // Conectar a la base de datos
        this.conectarDB();
        //iniciar middleware
        this.middlewares();
        //iniciar rutas
        this.routes();
    }

    listen(){
        console.log('Iniciando app');
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto: ', this.port);
        })
    }

    //Conectar base de datos
    async conectarDB(){
        await dbConnection();  

    }

    //Middlewares  

    middlewares(){
        console.log('prueba')
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