
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { CSV_PATHS } = require('../enums/csv-path');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.categoriesPath = '/api/categories';
        this.tagCreatePath = '/api/tag-create';

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
  
        //cors
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());

        //Parseo para el form data
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: true }));

        //subir los archivos desde el postman.
        this.app.use( fileUpload({
            createParentPath:true
        }));


      
    }

    
    //Rutas

    routes () {
        this.app.use(this.categoriesPath, require('../routes/categories'));
        this.app.use(this.tagCreatePath, require('../routes/tag-create'));
    }



}


module.exports = Server;