import Server from "./classes/server";
import mongoose from "mongoose";

import cors from 'cors'

import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import userRoutes from "./routes/usuario";
import postRoutes from './routes/post';

const server = new Server();


// Body Parser
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );


//FileUpload
server.app.use( fileUpload() );


//Configuracion CORS
server.app.use( cors({origin:true, credentials: true}) )


//Rutas de la app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);


//conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', (err)=>{
    if (err) throw err;
    console.log("Base de datos online");
    
});

//levantar express

server.start(()=>{
    console.log("Servidor corriendo en el puerto ", server.port);
});


