import { Router } from 'express';

import { usuarioController } from '../controllers/usuarioController';

class UsuarioRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', usuarioController.list);
        this.router.get('/:id', usuarioController.getOne);
        this.router.get('/direcciones/:id', usuarioController.getDirecciones);
        this.router.delete('/direcciones/:id', usuarioController.eliminarDireccion);

        this.router.post('/',usuarioController.create);
        this.router.post('/direcciones',usuarioController.insertarDireccion);
        this.router.delete('/:id',usuarioController.delete);
        this.router.put('/',usuarioController.udpate);
        this.router.post('/login',usuarioController.login);
        this.router.post('/register',usuarioController.register);
        this.router.post('/descifrar', usuarioController.getOneByToken);
        this.router.post('/createCarro', usuarioController.createCarro);


    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router; 