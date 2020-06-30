import { Container } from 'typedi';
import locationService from '../services/location' 
import agenda from '../lib/agenda';


export default class addLocationJob {
  public async handler(job, done): Promise<void> {
    const Logger = Container.get('logger');
    try {
      Logger.debug('✌️ Add Location Job triggered!');
      const { email, name }: { [key: string]: string } = job.attrs.data;

      // This will be the job that will add location every 3 minutes. 
      Container.get('AgendaInstance');
      const locationServiceInstance = Container.get(locationService);
    //   const mailerServiceInstance = Container.get(MailerService);
      done();
    } catch (e) {
      Logger.error('🔥 Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}