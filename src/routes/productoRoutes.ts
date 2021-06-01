import { Router } from 'express';

import { productoController } from '../controllers/productoController';

class ProductoRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', productoController.list);
        this.router.get('/tiposProducto', productoController.getProductoTipos);
        this.router.get('/:id', productoController.getOne);
        this.router.get('/nombre/:nombre', productoController.getOneLike);
        this.router.post('/',productoController.create);
        this.router.delete('/:id',productoController.delete);
        this.router.put('/:id',productoController.udpate);
    }
}

const productoRoutes = new ProductoRoutes();
export default productoRoutes.router;