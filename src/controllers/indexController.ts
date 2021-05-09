import { Request, Response } from 'express';

class IndexController {
    index (req: Request, res: Response) {
        res.json({text: 'API is /api/fruteria'})
    } 
}

export const indexController = new IndexController();