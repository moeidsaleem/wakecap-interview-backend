import { IClient } from '../interfaces/IClient';
import mongoose from 'mongoose';

const Client = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Please provide full name'],
            index: true
        },
        email:{
            type: String,
            unique: true,
            index: true,
            lowecase: true
        },
        phone:{
            type: String,
            index: true
        }
},{
    timestamps: true
})

export default mongoose.model<IClient & mongoose.Document>('Client', Client)