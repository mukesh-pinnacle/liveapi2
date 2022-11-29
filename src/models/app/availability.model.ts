import { model, Schema, Document } from 'mongoose';
import { AvailabilityInt } from '@interfaces/app/availability.interface';

const availabilitySchema: Schema = new Schema({
   
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true, 
    },
    signInSignOut_id:{
        type: Schema.Types.ObjectId, 
        ref: 'Aigninsignouts',
        require: true,
    },
    isAvailable :{
        type: Number,
        require: true,
        //offline = 0	online = 1	buzy = 2
    },
    available_time: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const AvailabilityModel = model<AvailabilityInt & Document>('Availability', availabilitySchema);

export default AvailabilityModel;