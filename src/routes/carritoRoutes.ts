import { Router } from 'express';

import { carritoController } from '../controllers/carritoController';

class CarritoRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/carritoProductos/:id', carritoController.getCarritoProductos);
        this.router.post('/carritoProducto', carritoController.insertarProductoCarro);
        this.router.delete('/carritoProducto/:id', carritoController.eliminarProductoCarro);
        this.router.post('/venta', carritoController.insertarVenta);
        this.router.post('/ventaProducto', carritoController.insertarVentaProducto);
        this.router.get('/resumenVentas', carritoController.resumenVentas); 
    }
}

const carritoRoutes = new CarritoRoutes();
export default carritoRoutes.router;