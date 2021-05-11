import { Request, Response } from 'express';

import pool from '../database';

class ProductoController {

    public async list (req: Request, res: Response) {
        await pool.query('SELECT * FROM PRODUCTO', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    } 

    public async getOne (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const producto = await pool.query('SELECT * FROM PRODUCTO WHERE id = ?',id, function(err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Producto encontrado");
        }); 

    } 

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO PRODUCTO SET ?', [req.body]);
        console.log(req.body)
        res.json({message: 'creando un producto'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM PRODUCTO WHERE ID = ?', [id]);
        res.json({text: 'Producto borrado: '+ req.params.id});
    }
    
    public async udpate (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE PRODUCTO SET ? WHERE ID = ?',[req.body ,id]);
        res.json({message: 'Producto actualizado'});
    }
}

export const productoController = new ProductoController();