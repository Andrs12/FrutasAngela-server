"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fruteriaController_1 = require("../controllers/fruteriaController");
var FruteriaRoutes = /** @class */ (function () {
    function FruteriaRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    FruteriaRoutes.prototype.config = function () {
        this.router.get('/', fruteriaController_1.fruteriaController.list);
        this.router.get('/:id', fruteriaController_1.fruteriaController.getOne);
        this.router.post('/', fruteriaController_1.fruteriaController.create);
        this.router.delete('/:id', fruteriaController_1.fruteriaController.delete);
        this.router.put('/:id', fruteriaController_1.fruteriaController.udpate);
    };
    return FruteriaRoutes;
}());
var fruteriaRoutes = new FruteriaRoutes();
exports.default = fruteriaRoutes.router;
