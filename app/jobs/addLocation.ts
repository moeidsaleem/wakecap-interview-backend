import { Container } from 'typedi';
import locationService from '../services/location' 

export default class addLocationJob {

  public async handler(job, done): Promise<void> {
    const Logger = Container.get('logger');
    try {
      Logger.debug('✌️ Add Location Job triggered!');
      Logger.debug(new Date().toTimeString())
      // This will be the job that will add location every 3 minutes. Faking the location every 3 minutes.
      // const agenda = Container.get('AgendaInstance');
      const locationServiceInstance = Container.get(locationService);
      locationServiceInstance.addLocation( {
        "coordinates": {
            "coordinates": [
                -73.27 + (Math.round((Math.random()*10) * 100) / 100),
                39.47 + (Math.round((Math.random()*10) * 100) / 100)
            ],
            "type": "Point"
        },
        "_id": "5efbe6c964002ceaab16955c",
        "is_active": true,
        "duration": 180,
        "worker_id": "5efbe3e9cd8bc8e8660f8695"
    })
    //   const mailerServiceInstance = Container.get(MailerService);
      done();
    } catch (e) {
      Logger.error('🔥 Error with Add Location Job: %o', e);
      done(e);
    }
  }
}