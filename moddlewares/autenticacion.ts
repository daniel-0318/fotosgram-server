import { Response, Request, NextFunction } from "express";
import Token from "../classes/token";


export const verificaToken = ( req: any, res: Response, next: NextFunction ) => {

    const userToken = req.get('x-token') || ''; // puede ser nulo por eso sino se recibe sera un caracter vacio

    console.log("/////////////////////////");
    
    console.log(req.get('nombre'));

    console.log("/////////////////////////");
    

    Token.comprobarToken(userToken).then( (decoded: any) => {

        console.log('Decoded', decoded);
        
        req.usuario = decoded.usuario;
        next();

    }).catch(err => {

        res.json({
            ok: false,
            mensaje: "Token no es correcto",
        });

    });

}