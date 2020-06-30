import { Service, Inject } from 'typedi';
import { IClient } from '../interfaces/IClient';

@Service()
export default class clientService {

  constructor(
    @Inject('clientModel') private clientModel: Models.clientModel,
    @Inject('logger') private logger,
  ) { }
  public async getClients(): Promise<{ clients: Array<IClient>; }> {
    try {
      const clientRecord = await this.clientModel.aggregate();
      if (!clientRecord) {
        throw new Error('No Client found!');
      }
      this.logger.silly('Clients Found');
      const clients = clientRecord;
      return { clients };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addClient(clientData: any): Promise<{ client: IClient; success: boolean }> {
    try {
      const clientRecord = await this.clientModel.create({
        title: clientData.title,
        email: clientData.email,
        phone:clientData.phone,
      })
      if (!clientRecord) {
        throw new Error('client cannot be created');
      }
      const client = clientRecord;
      const success = true;
      console.log('client', client)
      return { client, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteClient(clientId: ObjectId): Promise<{  success: boolean; }> {
    try {
      const clientRecord = this.clientModel.findOneAndRemove({ "_id": clientId });
     console.log('client-record', clientRecord)
      return { success: true}
    } catch (e) {
      console.log('error', e)
    }
  }
}