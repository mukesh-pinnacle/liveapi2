import { model, Schema, Document } from 'mongoose';
import { Contact } from '@interfaces/app/contacts.interface';

const contactsSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
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
    pubsub_token: {
        type: String,
        required: true,
    },
    additional_attributes: {
        type: Object,
        required: true,
    },
    identifier: {
        type: String,
        required: true,
    },
    custom_attributes: {
        type: Object,
        required: true,
    },
    file_name: {
        type: String,
        required: false,
    },
    file_url: {
        type: String,
        required: false,
    },
    last_activity: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const contactsModel = model<Contact & Document>('Contacts', contactsSchema);

export default contactsModel;
