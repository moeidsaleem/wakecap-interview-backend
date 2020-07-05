import { Container } from 'typedi';
import locationService from '../services/location' 
import siteService from '../services/site';
import workerService from '../services/worker';

export default class generateReportJob {

  public async handler(job, done): Promise<void> {
    const Logger = Container.get('logger');
    try {
      Logger.debug('✌️ Generate Report triggered!');
      Logger.debug(new Date().toTimeString())

      // services 
      const locationServiceInstance = Container.get(locationService);
      const siteServiceInstance = Container.get(siteService);
      const workerServiceInstance = Container.get(workerService);
    
      // Here we will be generating report for each site. 
      /* 
      - FETCH all sites 
      - For Each Site we will find all workers of that site.
      - We will check if each worker last 

      */

      

  const report ={
        absent_worker: 0, 
        late_workers:0,
        inactive_workers:0,
        active_workers:0

      }

      let sites = (await siteServiceInstance.getSites()).sites;
      sites.forEach(async site => {
        let workers = (await workerServiceInstance.getWorkers()).workers;
        workers.forEach(async worker => {
          let locations = await (await locationServiceInstance.getLastDayReportOfWorker(worker._id)).locations;
          if(locations.length <=0){
            // console.log('chalaa')
            report.absent_worker++;
            // console.log('report', report)
          }
          let lateLocationsOfWorker = await(await locationServiceInstance.GetLocationsAboveThreshold(worker._id, site.ending_hours)).locations;
          console.log(lateLocationsOfWorker.length);

        });



        
      })
      // const agenda = Container.get('AgendaInstance');
    //   locationServiceInstance.addLocation( {
    //     "coordinates": {
    //         "coordinates": [
    //             -73.27 + (Math.round((Math.random()*10) * 100) / 100),
    //             39.47 + (Math.round((Math.random()*10) * 100) / 100)
    //         ],
    //         "type": "Point"
    //     },
    //     "_id": "5efbe6c964002ceaab16955c",
    //     "is_active": true,
    //     "duration": 180,
    //     "worker_id": "5efbe3e9cd8bc8e8660f8695"
    // })
    //   const mailerServiceInstance = Container.get(MailerService);
      done();
    } catch (e) {
      Logger.error('🔥 Error with Generate Report Job: %o', e);
      done(e);
    }
  }
}