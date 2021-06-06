"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var carritoController_1 = require("../controllers/carritoController");
var CarritoRoutes = /** @class */ (function () {
    function CarritoRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    CarritoRoutes.prototype.config = function () {
        this.router.get('/carritoProductos/:id', carritoController_1.carritoController.getCarritoProductos);
        this.router.post('/carritoProducto', carritoController_1.carritoController.insertarProductoCarro);
        this.router.delete('/carritoProducto/:id', carritoController_1.carritoController.eliminarProductoCarro);
        this.router.post('/venta', carritoController_1.carritoController.insertarVenta);
        this.router.post('/ventaProducto', carritoController_1.carritoController.insertarVentaProducto);
        this.router.get('/resumenVentas', carritoController_1.carritoController.resumenVentas);
    };
    return CarritoRoutes;
}());
var carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
