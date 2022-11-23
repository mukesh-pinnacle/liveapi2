import { model, Schema, Document } from 'mongoose';
import { WorkingHours } from '@interfaces/app/working_hours.interface';

const workingHoursSchema: Schema = new Schema({
    inboxes_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Inboxes',
        required: true, 
    },
    inbox_shift_id:{
        type : Schema.Types.ObjectId,
        ref: 'InboxesShiftDetails',
        require: true,
    },
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true, 
    },
    day_of_week:{
        type : Number,
        require: true,
    },
    closed_all_day:{
        type : Boolean,
        require: false,
    },
    open_hour:{
        type : Number,
        require: false,
    },
    open_minutes:{
        type : Number,
        require: false,
    },
    close_hour: {
        type : Number,
        require: false,
    },
    closed_minutes:{
        type : Number,
        require: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const workingHoursModel = model<WorkingHours & Document>('WorkingHours', workingHoursSchema);

export default workingHoursModel;