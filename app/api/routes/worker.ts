import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import workerService from '../../services/worker';
import { IWorkerInput } from '../../interfaces/IWorker';

const route = Router();

export default (app: Router) => {
  app.use('/workers', route);
  const workerServiceInstance = Container.get(workerService);

  //get All
  route.post('/' ,async (req: Request, res: Response) => {
    try{
        const {workers} = await workerServiceInstance.getWorkers();
        return res.json(workers).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id',(req: Request, res: Response)=>{

  })


  //create Worker
  route.post('/add', 
    celebrate({
        body:Joi.object({
            title: Joi.string().required(),
            photo: Joi.string().required(),
            worker:Joi.object()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { worker, success } = await workerServiceInstance.addWorker(req.body as IWorkerInput);
            return res.status(201).json({worker, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  

    //create Worker
  route.get('/delete/:id', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
          const {  success } = await workerServiceInstance.deleteWorker(req.params.id);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

  
};
