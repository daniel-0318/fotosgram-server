import { Request, Response, Router } from "express";


const userRoutes = Router();

userRoutes.get('/create', (req: Request, res: Response) =>{

    res.json({
        ok: true,
        mensaje: "todo funciona bien!"
    })

});


export default userRoutes;