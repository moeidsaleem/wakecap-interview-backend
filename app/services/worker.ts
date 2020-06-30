import { Service, Inject } from 'typedi';
import { IWorker } from '../interfaces/IWorker';

@Service()
export default class workerService {

  constructor(
    @Inject('workerModel') private workerModel: Models.workerModel,
    @Inject('logger') private logger,
  ) { }
  public async getWorkers(): Promise<{ workers: Array<IWorker>; }> {
    try {
      const workerRecord = await this.workerModel.aggregate();
      if (!workerRecord) {
        throw new Error('No Worker found!');
      }
      this.logger.silly('Workers Found');
      const workers = workerRecord;
      return { workers };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addWorker(workerData: any): Promise<{ worker: IWorker; success: boolean }> {
    try {
      const workerRecord = await this.workerModel.create({
        site_id: workerData.site_id,
        name: workerData.name
      })
      if (!workerRecord) {
        throw new Error('worker cannot be created');
      }
      const worker = workerRecord;
      const success = true;
      console.log('worker', worker)
      return { worker, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteWorker(workerId: any): Promise<{  success: boolean; }> {
    try {
      const workerRecord = this.workerModel.findOneAndRemove({ "_id": workerId });
     console.log('worker-record', workerRecord)
      return { success: true}
    } catch (e) {
      console.log('error', e)
    }
  }
}