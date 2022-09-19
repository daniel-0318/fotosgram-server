"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || ''; // puede ser nulo por eso sino se recibe sera un caracter vacio
    console.log("/////////////////////////");
    console.log(req.get('nombre'));
    console.log("/////////////////////////");
    token_1.default.comprobarToken(userToken).then((decoded) => {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    }).catch(err => {
        res.json({
            ok: false,
            mensaje: "Token no es correcto",
        });
    });
};
exports.verificaToken = verificaToken;
