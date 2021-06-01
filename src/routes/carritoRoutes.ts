import { Router } from 'express';

import { carritoController } from '../controllers/carritoController';

class CarritoRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/carritoProductos/:id', carritoController.getCarritoProductos);
        this.router.post('/comprar/', carritoController.insertarVenta);
        this.router.post('/carritoProducto', carritoController.insertarProductoCarro);
        this.router.delete('/carritoProducto/:id', carritoController.eliminarProductoCarro);
    }
}

const carritoRoutes = new CarritoRoutes();
export default carritoRoutes.router;