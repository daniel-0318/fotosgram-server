"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
// Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload
server.app.use((0, express_fileupload_1.default)());
//Rutas de la app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
//conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if (err)
        throw err;
    console.log("Base de datos online");
});
//levantar express
server.start(() => {
    console.log("Servidor corriendo en el puerto ", server.port);
});
