import { model, Schema, Document } from 'mongoose';
import { InboxesShiftDetails } from '@interfaces/app/inboxes_shift_details.interface';

const inboxesShiftDetailsSchema: Schema = new Schema({
    //inboxid required
    inboxes_details_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'InboxesDetails',
        required: true, 
    },
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true, 
    },   
    shift_type: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    to_time: {
        type: Date,
        required: false,
    },
    from_time: {
        type: Date,
        required: false,
    },
    is_active: {
        type: Number,
        required: false,
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

const inboxesShiftDetailsModel = model<InboxesShiftDetails & Document>('InboxesShiftDetails', inboxesShiftDetailsSchema);

export default inboxesShiftDetailsModel;