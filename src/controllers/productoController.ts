import { Request, Response } from 'express';

import pool from '../database';

class ProductoController {

    public async list(req: Request, res: Response) {
        await pool.query('SELECT * FROM PRODUCTO', function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const producto = await pool.query('SELECT * FROM PRODUCTO WHERE id = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Producto encontrado");
        });

    }

    public async getOneLike(req: Request, res: Response): Promise<void> {
        const { nombre } = req.params;
        const producto = await pool.query("SELECT * FROM `producto` WHERE nombre like '%"+nombre+"%'", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Producto encontrado");
        });

    }
    public async getProductoTipos(req: Request, res: Response): Promise<void> {

        const producto = await pool.query('SELECT * FROM tipo_producto', function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Tipos de producto encontrados");
        });

    }


    public async create(req: Request, res: Response): Promise<void> {
        const producto = req.body
        console.log(producto);
        await pool.query("INSERT INTO `producto`(`nombre`, `tipo_producto`, `descripcion`, `pvp_unidad`, `stock`, `imagen`) VALUES ('"+producto.nombre+"',"+producto.tipo_producto+",'"+producto.descripcion+"',"+producto.pvp_unidad+","+producto.stock+",'"+producto.imagen+"')");
        res.json({ message: 'creando un producto' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM PRODUCTO WHERE id = ?', [id]);
        res.json({ text: 'Producto borrado: ' + req.params.id });
    }

    public async udpate(req: Request, res: Response): Promise<void> {
        const producto = req.body
        await pool.query('UPDATE PRODUCTO SET ? WHERE id = ?', [producto, producto.id]);
        res.json({ message: 'Producto actualizado' });
    }
}

export const productoController = new ProductoController();