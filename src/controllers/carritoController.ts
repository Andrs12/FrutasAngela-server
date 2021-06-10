import { Request, Response } from 'express';
import pool from '../database';
class CarritoController {
    public async getCarritoProductos(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const usuario = await pool.query('SELECT producto.id, carrito_producto.id as carrito_id_producto ,producto.nombre, producto.pvp_unidad, producto.imagen ,carrito_producto.unidades, (producto.pvp_unidad*carrito_producto.unidades) AS total FROM producto, carrito_producto, usuario WHERE producto.id = carrito_producto.id_producto AND usuario.id_carrito = carrito_producto.carrito_id AND usuario.id_carrito = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async insertarVenta(req: Request, res: Response): Promise<void> {
        const datos = req.body;
        await pool.query("INSERT INTO `venta`(`ID_DIRECCION`) VALUES (" + datos.id_direccion + ")");
        res.json({ message: "true" });
    }

    public async insertarVentaProducto(req: Request, res: Response): Promise<void> {
        const datos = req.body;
        let query: string = "";
        console.log(datos)
        console.log(datos.length)
        for (let i = 0; i < datos.length - 1; i++) {
            query += "INSERT INTO `venta_producto`(`ID_VENTA`, `ID_PRODUCTO`, `CANTIDAD`) VALUES ((SELECT MAX(ID) FROM venta) ," + datos[i].id + "," + datos[i].unidades + ");\n";
            await pool.query("INSERT INTO `venta_producto`(`ID_VENTA`, `ID_PRODUCTO`, `CANTIDAD`) VALUES ((SELECT MAX(ID) FROM venta) ," + datos[i].id + "," + datos[i].unidades + ")");
        }
        console.log(query)
        await pool.query("DELETE FROM `CARRITO_PRODUCTO` WHERE CARRITO_ID = " + datos[datos.length - 1].id_carrito);
        res.json({ message: "Productos insertados correctamente" })
    }

    public async resumenVentas(req: Request, res: Response): Promise<void> {
        await pool.query("SELECT venta_producto.id, venta_producto.id_venta, venta.fecha, producto.nombre, venta_producto.cantidad, (venta_producto.cantidad*producto.pvp_unidad) as total from venta_producto, venta, producto where venta_producto.id_producto = producto.id and venta_producto.id_venta = venta.ID order by venta.id", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });

    }


    public async insertarProductoCarro(req: Request, res: Response): Promise<void> {
        const datos = req.body;
        await pool.query("INSERT INTO `carrito_producto`(`id_producto`, `unidades`, `carrito_id`) VALUES (" + datos.id_producto + "," + datos.unidades + "," + datos.carrito_id + ")");
        res.json({ message: "Producto insertado" });

    }

    public async eliminarProductoCarro(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query("DELETE FROM `carrito_producto` WHERE id = " + id);
        res.json({ message: "Producto eliminado del carrito" });
    }
}


export const carritoController = new CarritoController();