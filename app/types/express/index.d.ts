import { Document, Model } from 'mongoose';
import mongoose from 'mongoose'
import { IClient } from '../../interfaces/IClient';
import { ISite } from '../../interfaces/ISite';
import { IWorker } from '../../interfaces/IWorker';
import { ILocation } from '../../interfaces/ILocation';
import { IReport } from '../../interfaces/IReport';

declare global {

//   namespace Express {
//     export interface Request {
//       currentUser: IUSer & Document;

//     }    
//   }
  namespace Models {
    export type clientModel = Model<IClient & Document>;
    export type siteModel = Model<ISite & Document>;
    export type workerModel = Model<IWorker & Document>;
    export type locationModel = Model<ILocation & Document>;
    export type reportModel = Model<IReport & Document>;
  }
  export type ObjectId = mongoose.Schema.Types.ObjectId;
  

}

