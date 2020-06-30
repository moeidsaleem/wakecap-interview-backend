import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import reportService from '../../services/report';
import { IReportInput } from '../../interfaces/IReport';

const route = Router();

export default (app: Router) => {
  app.use('/reports', route);
  const reportServiceInstance = Container.get(reportService);

  //get All
  route.post('/' ,async (req: Request, res: Response) => {
    try{
        const {reports} = await reportServiceInstance.getReports();
        return res.json(reports).status(200);

    }catch(e){

    }
  });

  //get Single 
  route.get('/:id',(req: Request, res: Response)=>{

  })


  //create Report
  route.post('/add', 
    celebrate({
        body:Joi.object({
            title: Joi.string().required(),
            photo: Joi.string().required(),
            report:Joi.object()
        })
    }), async(req:Request, res:Response, next: NextFunction)=>{
    // const logger = Container.get('logger');
    console.log(req.body);
        // logger.debug('req', req.body);
        try{
            const { report, success } = await reportServiceInstance.addReport(req.body as IReportInput);
            return res.status(201).json({report, success})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })
  

    //create Report
  route.get('/delete/:id', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
          const {  success } = await reportServiceInstance.deleteReport(req.params.id);
          return res.status(201).json({ success});
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

  
};
