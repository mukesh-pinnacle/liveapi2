import { model, Schema, Document } from 'mongoose';
import { Inboxes } from '@interfaces/app/inboxes.interface';

const inboxesSchema: Schema = new Schema({
    channel_type_id: { 
        type: Schema.Types.ObjectId, 
        // ref: 'User',
        required: true, 
    },
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true, 
    },
    name: {
        type: String,
        required: true,
        // unique: true,
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

const inboxesModel = model<Inboxes & Document>('Inboxes', inboxesSchema);

export default inboxesModel;