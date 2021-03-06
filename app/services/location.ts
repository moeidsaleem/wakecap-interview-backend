import { Service, Inject } from 'typedi';
import { ILocation } from '../interfaces/ILocation';
import LoggerInstance from '../lib/logger';

@Service()
export default class locationService {

  constructor(
    @Inject('locationModel') private locationModel: Models.locationModel,
    @Inject('logger') private logger,
  ) { }



  public async getLocations(): Promise<{ locations: Array<ILocation>; }> {
    try {
      const locationRecord = await this.locationModel.find();
      if (!locationRecord) {
        throw new Error('No Location found!');
      }
      this.logger.silly('Locations Found');
      const locations = locationRecord;
      return { locations };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public ISODate(date){
    return new Date(date).toISOString();
  }


  public async getLastDayReportOfWorker(worker_id): Promise<{ locations: Array<ILocation>; }> {
    try {
      let date =( new Date())
      date.setHours(date.getHours() - 1 ) // past 24 hours 
      console.log('worker_id', worker_id)
      const locationRecord = await this.locationModel.find({
        worker_id: worker_id, 
        createdAt: {
          $lt: new Date(),
          $gte: date
      }
      });
      if (!locationRecord) {
        throw new Error('No Location found!');
      }
      this.logger.silly('Locations Found');
      const locations = locationRecord;
      return { locations };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }



  public async GetLocationsAboveThreshold(worker_id, ending_time): Promise<{ locations: Array<ILocation>; }> {
    try {
      let date =( new Date())
      // Threshold
      date.setHours(ending_time.substr(0,2), ending_time.substr(3,2), ending_time.substr(6,2))

      // date.setHours(date.getHours() - 1 ) // past 24 hours 
      console.log('worker_id', worker_id)
      const locationRecord = await this.locationModel.find({
        worker_id: worker_id, 
        createdAt: {
          $lt: new Date(),
          $gte: date
      }
      });
      if (!locationRecord) {
        throw new Error('No Location found!');
      }
      this.logger.silly('Locations Found');
      const locations = locationRecord;
      return { locations };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getWorkerLocations(worker_id): Promise<{ locations: Array<ILocation>; }> {
    try {
      const locationRecord = await this.locationModel.find({"worker_id":worker_id});
      if (!locationRecord) {
        throw new Error('No Location found!');
      }
      this.logger.silly('Locations Found');
      const locations = locationRecord;
      return { locations };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addLocation(locationData: any): Promise<{ location: ILocation; success: boolean }> {
    try {
      const locationRecord = await this.locationModel.create({
        coordinates: locationData.coordinates,
        is_active: locationData.is_active,
        duration:locationData.duration,
        worker_id:locationData.worker_id,
      })
      if (!locationRecord) {
        throw new Error('location cannot be created');
      }
      const location = locationRecord;
      const success = true;
      console.log('location', location)
      return { location, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteLocation(locationId: any): Promise<{  success: boolean; }> {
    try {
      const locationRecord = this.locationModel.findOneAndRemove({ "_id": locationId });
     console.log('location-record', locationRecord)
      return { success: true}
    } catch (e) {
      console.log('error', e)
    }
  }
}