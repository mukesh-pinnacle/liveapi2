import { model, Schema, Document } from 'mongoose';
import { WorkingHours } from '@interfaces/app/working_hours.interface';

const workingHoursSchema: Schema = new Schema({
    inboxes_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'InboxesDetails',
        required: true, 
    },
    inboxes_shift_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'InboxesShiftDetails',
        required: true, 
    },
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true, 
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