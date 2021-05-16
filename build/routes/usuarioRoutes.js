"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuarioController_1 = require("../controllers/usuarioController");
var UsuarioRoutes = /** @class */ (function () {
    function UsuarioRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    UsuarioRoutes.prototype.config = function () {
        this.router.get('/', usuarioController_1.usuarioController.list);
        this.router.get('/:id', usuarioController_1.usuarioController.getOne);
        this.router.post('/', usuarioController_1.usuarioController.create);
        this.router.delete('/:id', usuarioController_1.usuarioController.delete);
        this.router.put('/:id', usuarioController_1.usuarioController.udpate);
        this.router.post('/login', usuarioController_1.usuarioController.login);
        this.router.post('/register', usuarioController_1.usuarioController.register);
    };
    return UsuarioRoutes;
}());
var usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
