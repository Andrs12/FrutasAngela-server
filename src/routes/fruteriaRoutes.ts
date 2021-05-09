import { Router } from 'express';

import { fruteriaController } from '../controllers/fruteriaController';

class FruteriaRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', fruteriaController.list);
        this.router.get('/:id', fruteriaController.getOne);
        this.router.post('/',fruteriaController.create);
        this.router.delete('/:id',fruteriaController.delete);
        this.router.put('/:id',fruteriaController.udpate);
    }
}

const fruteriaRoutes = new FruteriaRoutes();
export default fruteriaRoutes.router;