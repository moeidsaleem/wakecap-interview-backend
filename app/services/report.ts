import { Service, Inject } from 'typedi';
import { IReport } from '../interfaces/IReport';

@Service()
export default class reportService {

  constructor(
    @Inject('reportModel') private reportModel: Models.reportModel,
    @Inject('logger') private logger,
  ) { }
  public async getReports(): Promise<{ reports: Array<IReport>; }> {
    try {
      const reportRecord = await this.reportModel.aggregate();
      if (!reportRecord) {
        throw new Error('No Report found!');
      }
      this.logger.silly('Reports Found');
      const reports = reportRecord;
      return { reports };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addReport(reportData: any): Promise<{ report: IReport; success: boolean }> {
    try {
      const reportRecord = await this.reportModel.create({
        absent_workers: reportData.absent_workers,
        late_workers: reportData.late_workers,
        active_hours: reportData.active_hours,
        inactive_hours: reportData.inactive_hours,
        site_id: reportData.site_id
      })
      if (!reportRecord) {
        throw new Error('report cannot be created');
      }
      const report = reportRecord;
      const success = true;
      console.log('report', report)
      return { report, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteReport(reportId: ObjectId): Promise<{  success: boolean; }> {
    try {
      const reportRecord = this.reportModel.findOneAndRemove({ "_id": reportId });
     console.log('report-record', reportRecord)
      return { success: true}
    } catch (e) {
      console.log('error', e)
    }
  }
}