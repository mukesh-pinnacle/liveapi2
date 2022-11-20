import { model, Schema, Document } from 'mongoose';
import { InboxesDetails } from '@interfaces/app/inboxes_details.interface';

const inboxesDetailsSchema: Schema = new Schema({
    inboxes_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Inboxes',
        required: true, 
    },
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true, 
    },   
    enable_auto_assignment: {
        type: Boolean,
        required: false,
    },
    greeting_enabled: {
        type: Boolean,
        required: false,
    },
    greeting_message: {
        type: String,
        required: false,
    },
    email_address: {
        type: String,
        required: false,
    },
    working_hours_enabled: {
        type: Boolean,
        required: false,
    },
    out_of_office_message: {
        type: String,
        required: false,
    },
    timezone: {
        type: String,
        required: false,
    },
    csat_survey_enabled: {
        type: Boolean,
        required: false,
    },
    allow_messages_after_resolved: {
        type: Boolean,
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

const inboxesDetailsModel = model<InboxesDetails & Document>('InboxesDetails', inboxesDetailsSchema);

export default inboxesDetailsModel;