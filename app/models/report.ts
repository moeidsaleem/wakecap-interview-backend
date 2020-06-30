
import {IReport } from '../interfaces/IReport';
import mongoose, { Schema } from 'mongoose';

const Report = new mongoose.Schema(
    {
        absent_workers:{
              type: {type: Array}
          },
          late_workers: {
            type: {type: Array}
          },        
          active_hours:{
            type: {type: Array}, 
        },
        inactive_hours:{
            type: {type: Number}
        }

},{
    timestamps: true
})
export default mongoose.model<IReport & mongoose.Document>('Report', Report)