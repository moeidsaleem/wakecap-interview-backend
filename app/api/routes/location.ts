import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import locationService from '../../services/location';
import { ILocationInput } from '../../interfaces/ILocation';

const route = Router();

export default (app: Router) => {
  app.use('/locations', route);
  const locationServiceInstance = Container.get(locationService);

  //get All
  route.get('/all' ,async (req: Request, res: Response) => {
    try{
        const {locations} = await locationServiceInstance.getLocations();
        return res.json(locations).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id',(req: Request, res: Response)=>{

  })


  //create Location
  route.post('/add', 
    celebrate({
        body:Joi.object({
            worker_id: Joi.string().required(),
            coordinates: Joi.object().required(),
            is_active: Joi.boolean().required(),
            duration: Joi.number().required()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { location, success } = await locationServiceInstance.addLocation(req.body as ILocationInput);
            return res.status(201).json({location, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  

    //create Location
  route.get('/delete/:id', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
          const {  success } = await locationServiceInstance.deleteLocation(req.params.id);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

  
};
