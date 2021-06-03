import { json, Request, Response } from 'express';

import keys from '../keys';
import pool from '../database';
import { Usuarios } from '../models/Usuario';
import { token } from 'morgan';

class UsuarioController {

    public async list(req: Request, res: Response) {
        await pool.query('SELECT * FROM USUARIO', function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const usuario = await pool.query('SELECT * FROM USUARIO WHERE id = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Usuario encontrado");
        });

    }

    public async getOneByToken(req: Request, res: Response): Promise<void> {
        var jwt = require('jsonwebtoken');
        var decoded = jwt.verify(req.body.token, keys.jwt.key);
        res.json(decoded)

    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO USUARIO SET ?', [req.body]);
        console.log(req.body)
        res.json({ message: 'Creando un usuario' });
    }

    public async createCarro(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO carrito VALUES()');
        console.log(req.body)
        res.json({ message: 'Carrito Creado' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM USUARIO WHERE id = ?', [id]);
        res.json({ text: 'Usuario borrado: ' + req.params.id });
    }

    public async udpate(req: Request, res: Response): Promise<void> {
        const usuario = req.body;
        console.log(usuario);
        await pool.query('UPDATE USUARIO SET ? WHERE id = ?', [usuario, usuario.id]);
        console.log("Usuario actualizado")
        res.json({ message: 'Usuario actualizado' });
    }

    public async login(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        const contrasena = req.body.contrasena;
        var usuario;
        const consulta = await pool.query("SELECT * FROM USUARIO WHERE email = \'" + email + "\' and contrasena = \'" + contrasena + "\'", function (err, result, fields) {
            if (err) throw err;
            if (result[0] != null) {
                usuario = result[0];
                try {
                    var jwt = require('jsonwebtoken');
                    const token = jwt.sign(usuario, keys.jwt.key);
                    res.json({ token: token });
                } catch (error) {
                    console.log("ERROR al encriptar");
                    res.json({ message: "No se ha podido encriptar" });
                }
            } else {
                res.json({ message: "usuario invalido" });
            }

        });


    }

    public async getDirecciones(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const usuario = await pool.query('SELECT * FROM DIRECCION WHERE id_usuario = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Direcciones del usuario:", id, "encontradas");
        });
    }

    public async insertarDireccion(req: Request, res: Response): Promise<void> {
        const direccion = req.body;
        console.log(direccion);
        await pool.query("INSERT INTO `direccion`(`direccion`, `id_usuario`) VALUES ('" + direccion.direccion + "'," + direccion.idUsuario + ")");

        res.json({ message: "Direccion insertada" });


    }

    public async eliminarDireccion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query("DELETE FROM `direccion` WHERE id = " + id);
        res.json({ message: "Direccion eliminada" })


    }
    public async register(req: Request, res: Response): Promise<void> {
        var usuario: any;
        try {
            usuario = req.body;
            await pool.query("INSERT INTO `usuario` (`nombre`, `apellido1`, `apellido2`, `telefono`, `email`, `contrasena`, `rol`, `id_carrito`) VALUES ('" + usuario.nombre + "', '" + usuario.apellido1 + "', '" + usuario.apellido2 + "', '" + usuario.telefono + "', '" + usuario.email + "', '" + usuario.contrasena + "', 2, (SELECT max(id) from usuario as us))");
            console.log("USUARIO INSERTADO----");
            try {
                console.log(usuario)
                var jwt = require('jsonwebtoken');
                const token = jwt.sign(usuario, keys.jwt.key);
                res.json(({ token: token }));
            } catch (error) {
                console.log("ERROR al encriptar");
                res.json(({ message: "No se ha podido encriptar" }));
            }
        } catch (error) {
            console.log("ERROR al realizar la insercion");
        }

    }
    /* METODOS DE AYUDA */
    public encriptar(usuario: any) {
        try {
            console.log(usuario)
            var jwt = require('jsonwebtoken');
            const token = jwt.sign(usuario, keys.jwt.key);
            return ({ token: token });
        } catch (error) {
            console.log("ERROR al encriptar");
            return ({ message: "No se ha podido encriptar" });
        }
    }

    public async crearCarrito(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO CARRITO VALUES()');
        res.json({ message: "Carrito creado" });
    }


}

export const usuarioController = new UsuarioController();