import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const server = new Server();


// Body Parser
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );

//Rutas de la app
server.app.use('/user', userRoutes);


//conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', (err)=>{
    if (err) throw err;
    console.log("Base de datos online");
    
});

//levantar express

server.start(()=>{
    console.log("Servidor corriendo en el puerto ", server.port);
});


