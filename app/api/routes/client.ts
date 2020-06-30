import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import clientService from '../../services/client';
import { IClientInput } from '../../interfaces/IClient';

const route = Router();

export default (app: Router) => {
  app.use('/clients', route);
  const clientServiceInstance = Container.get(clientService);

  //get All
  route.post('/' ,async (req: Request, res: Response) => {
    try{
        const {clients} = await clientServiceInstance.getClients();
        return res.json(clients).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id',(req: Request, res: Response)=>{

  })


  //create Client
  route.post('/add', 
    celebrate({
        body:Joi.object({
            title: Joi.string().required(),
            photo: Joi.string().required(),
            location:Joi.object()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { client, success } = await clientServiceInstance.addClient(req.body as IClientInput);
            return res.status(201).json({client, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  

    //create Client
  route.get('/delete/:id', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
          const {  success } = await clientServiceInstance.deleteClient(req.params.id);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

  
    


  
};
