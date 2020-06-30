import {IWorker } from '../interfaces/IWorker';
import mongoose, { Schema } from 'mongoose';

const Worker = new mongoose.Schema(
    {
          site_id:{
              type: Schema.Types.ObjectId,
              required:[true, 'Please provide Site'],
              ref: "Site"
          },
          name:{
            type: String
        }

},{
    timestamps: true
})

export default mongoose.model<IWorker & mongoose.Document>('Worker', Worker)