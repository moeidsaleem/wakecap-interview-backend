import {ISite } from '../interfaces/ISite';
import mongoose, { Schema } from 'mongoose';

const Site = new mongoose.Schema(
    {
          client:{
              type: Schema.Types.ObjectId,
              required:[true, 'Please provide Client'],
              ref: "Client"
          },
          timezone:{
            type: String
        },
        starting_hours:{
            type: String
        },
        ending_hours:{
            type: String
        },
        late_threshold:{
            type: String
        }

},{
    timestamps: true
})
// Site.index({ "location": "2dsphere" });

export default mongoose.model<ISite & mongoose.Document>('Site', Site)