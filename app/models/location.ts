
import {ILocation } from '../interfaces/ILocation';
import mongoose, { Schema } from 'mongoose';

const Location = new mongoose.Schema(
    {
          worker_id:{
              type: Schema.Types.ObjectId, 
              required:[true, 'Please provide Worker'],
              ref: "Worker"
          },
          coordinates: {
            type: { type: String },
            coordinates: []
          },        
          is_active:{
            type: Boolean
        },
        duration:{
            type: Number
        }

},{
    timestamps: true
})
Location.index({ "coordinates": "Point" });

export default mongoose.model<ILocation & mongoose.Document>('Location', Location)