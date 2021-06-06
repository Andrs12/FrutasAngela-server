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
        const usuario = await pool.query('SELECT * FROM USUARIO WHERE id = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });

    }

    public async getOneByToken(req: Request, res: Response): Promise<void> {
        try {
            var jwt = require('jsonwebtoken');
            var decoded = jwt.verify(req.body.token, keys.jwt.key);
            res.json(decoded)
        } catch (error) {
            res.json({ message: "Token invalido" });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO USUARIO SET ?', [req.body]);
        res.json({ message: 'Creando un usuario' });
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
        res.json({ message: 'Usuario actualizado' });
    }

    public async login(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        const contrasena = req.body.contrasena;
        var usuario;
        console.log(email, contrasena);
        try {
            console.log("ANTES DE LA CONSULTA-------")
            await pool.query("SELECT * FROM USUARIO WHERE email = '" + email + "' and contrasena = '" + contrasena + "'", function (err, result, fields) {
                console.log("DESPUES DE LA CONSULTA-------")

                console.log(result[0])
                if (result[0] != undefined) {
                    console.log("NO DEBERIA DE SALIR ESTO")
                    usuario = {
                        id: result[0].id,
                        nombre: result[0].nombre,
                        apellido1: result[0].apellido1,
                        apellido2: result[0].apellido2,
                        telefono: result[0].telefono,
                        email: result[0].email,
                        contrasena: result[0].contrasena,
                        rol: result[0].rol,
                        id_carrito: result[0].id_carrito
                    }
                    try {
                        console.log(usuario)
                        var jwt = require('jsonwebtoken');
                        const token = jwt.sign(usuario, keys.jwt.key);
                        console.log("token firmado")
                        console.log(token)
                        res.json({ token: token });
                    } catch (error) {
                        console.log(error)
                        console.log("ERROR al encriptar");
                        res.json({ message: "No se ha podido encriptar" });
                    }
                } else {
                    console.log("USUARIO NO ENCONTRADO")
                    res.json({ message: "usuario invalido" });
                }

            });
        } catch (error) {
            console.log("CONSULTA INVALIDA");
            res.json({ message: "Consulta invalida" });
        }



    }

    public async getDirecciones(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const usuario = await pool.query('SELECT * FROM DIRECCION WHERE id_usuario = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async insertarDireccion(req: Request, res: Response): Promise<void> {
        const direccion = req.body;
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
            await pool.query("SELECT * FROM USUARIO WHERE email = '" + usuario.email + "'", function (err, result, fields) {
                console.log("SELECT * FROM USUARIO WHERE email = '" + usuario.email + "'");
                console.log(result[0])
                if (result[0] == undefined) {
                    pool.query("INSERT INTO `usuario` (`nombre`, `apellido1`, `apellido2`, `telefono`, `email`, `contrasena`, `rol`, `id_carrito`) VALUES ('" + usuario.nombre + "', '" + usuario.apellido1 + "', '" + usuario.apellido2 + "', '" + usuario.telefono + "', '" + usuario.email + "', '" + usuario.contrasena + "', 2, (SELECT max(id) from usuario as us)+1)");
                    res.json({ message: "Usuario creado correctamente" });
                } else {
                    res.json({ message: "Este usuario ya existe" });
                }

            });


        } catch (error) {
            res.json(({ message: "No se ha podido crear el usuario" }));
        }

    }

    public async crearCarrito(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO CARRITO VALUES()');
        res.json({ message: "Carrito creado" });
    }


}

export const usuarioController = new UsuarioController();