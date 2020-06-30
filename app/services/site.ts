import { Service, Inject } from 'typedi';
import { ISite } from '../interfaces/ISite';

@Service()
export default class siteService {

  constructor(
    @Inject('siteModel') private siteModel: Models.siteModel,
    @Inject('logger') private logger,
  ) { }
  public async getSites(): Promise<{ sites: Array<ISite>; }> {
    try {
      const siteRecord = await this.siteModel.aggregate();
      if (!siteRecord) {
        throw new Error('No Site found!');
      }
      this.logger.silly('Sites Found');
      const sites = siteRecord;
      return { sites };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addSite(siteData: any): Promise<{ site: ISite; success: boolean }> {
    try {
      const siteRecord = await this.siteModel.create({
        client: siteData.client,
        timezone: siteData.timezone,
        starting_hours:siteData.starting_hours,
        ending_hours: siteData.ending_hours,
        late_threshold: siteData.late_threshold
      })
      if (!siteRecord) {
        throw new Error('site cannot be created');
      }
      const site = siteRecord;
      const success = true;
      console.log('site', site)
      return { site, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteSite(clientId: any): Promise<{  success: boolean; }> {
    try {
      const siteRecord = this.siteModel.findOneAndRemove({ "_id": clientId });
     console.log('site-record', siteRecord)
      return { success: true}
    } catch (e) {
      console.log('error', e)
    }
  }
}