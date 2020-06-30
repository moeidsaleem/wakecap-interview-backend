import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import siteService from '../../services/site';
import { ISiteInput } from '../../interfaces/ISite';

const route = Router();

export default (app: Router) => {
  app.use('/sites', route);
  const siteServiceInstance = Container.get(siteService);

  //get All
  route.post('/' ,async (req: Request, res: Response) => {
    try{
        const {sites} = await siteServiceInstance.getSites();
        return res.json(sites).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id',(req: Request, res: Response)=>{

  })


  //create Site
  route.post('/add', 
    celebrate({
        body:Joi.object({
            title: Joi.string().required(),
            photo: Joi.string().required(),
            site:Joi.object()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { site, success } = await siteServiceInstance.addSite(req.body as ISiteInput);
            return res.status(201).json({site, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  

    //create Site
  route.get('/delete/:id', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
          const {  success } = await siteServiceInstance.deleteSite(req.params.id);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

  
};
