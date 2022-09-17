import { Request, Response, Router } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from "bcrypt";


const userRoutes = Router();

userRoutes.post('/login', (req: Request, res: Response) =>{

    const body = req.body;

    Usuario.findOne({ email: body.email }, (err: any, userDB: any) => {
        if(err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: "Usuario/contraseña no son correctos",
            });
        }

        if (userDB.compararPassword(body.password) ) {
            res.json({
                ok: true,
                token: "sdofnoenvsdfmvapsldc",
            });
        }else{
            return res.json({
                ok: false,
                mensaje: "Usuario/contraseña no son correctos ***",
            });
        }

    })


});



userRoutes.post('/create', (req: Request, res: Response) =>{

    const user= {
        nombre:     req.body.nombre,
        email:      req.body.email,
        password:   bcrypt.hashSync(req.body.password, 10),
        avatar:     req.body.avatar
    }

    Usuario.create(user).then( userDB => {

        res.json({
            ok: true,
            mensaje: "todo funciona bien!",
            user: userDB
        });

    }).catch(err => {

        res.json({
            ok: false,
            err
        });
        
    });


});


export default userRoutes;