"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productoController_1 = require("../controllers/productoController");
var ProductoRoutes = /** @class */ (function () {
    function ProductoRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ProductoRoutes.prototype.config = function () {
        this.router.get('/', productoController_1.productoController.list);
        this.router.get('/tiposProducto', productoController_1.productoController.getProductoTipos);
        this.router.get('/:id', productoController_1.productoController.getOne);
        this.router.get('/nombre/:nombre', productoController_1.productoController.getOneLike);
        this.router.post('/', productoController_1.productoController.create);
        this.router.delete('/:id', productoController_1.productoController.delete);
        this.router.put('/', productoController_1.productoController.udpate);
    };
    return ProductoRoutes;
}());
var productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
