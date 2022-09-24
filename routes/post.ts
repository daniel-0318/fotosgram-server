import { Response, Router } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from "../classes/file-system";


const postRoutes = Router();
const fileSystem = new FileSystem();

//Obtener Post paginados
postRoutes.get('/', async (req: any, res: Response)=>{

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const post = await Post.find()
                            .sort({_id: -1}) // se puede usar la fecha pero en mongo se puede usar el id para teenrlo en forma desc (-1)
                            .limit(10)
                            .skip(skip)
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        pagina,
        post 
    });

});


//Crear Post
postRoutes.post('/', [verificaToken], (req: any, res: Response)=>{

    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesDeTempHaciaPost( req.usuario._id );
    console.log("-------- Aqui ------------");
    console.log(imagenes);
    console.log("/////////////////////");
    
    body.imgs = imagenes;


    Post.create( body ).then(async postDB =>{

        await postDB.populate('usuario', '-password');

        res.json({
            ok: true,
            post: postDB,
        });

    }).catch(err => {
        res.json(err);
    })

});


// Servicio para subir archivos
postRoutes.post('/upload', [ verificaToken ], async (req: any, res: Response) => {

    if( !req.files ){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if( !file ){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if( !file.mimetype.includes('image') ){
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
        ok: true,
        file
    });

});





export default postRoutes;