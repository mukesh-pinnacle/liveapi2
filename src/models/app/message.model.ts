import { model, Schema, Document } from 'mongoose';
import { MessageInt } from '@/interfaces/app/message.interface';


const MessageSchema: Schema = new Schema({
   
    account_id: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: true,
    },
    inbox_id: {
        type: Schema.Types.ObjectId,
        ref: 'inboxes',
        required: true,
    },
    conversation_id:{
        type: Schema.Types.ObjectId,
        ref: 'conversations',
        required: true,
    },
    chat_assign_Id:{
        type: Schema.Types.ObjectId,
        ref: 'acht_assigns',
        required: true,
    },
    message_type : {
        type: Number,
        default: 0,
    },
    content: {
        type : String,
        require: true,
    },
    media_path : {
        type : String,
        //require: true,
    },
    is_private : {
        type : Number,
        default : 0,
    },
    content_type :{
        type: Number,
        required: true,
    },
    sender_type:{
        type: Number,
        require: true,
    },
    sender_id : {
        type : Schema.Types.ObjectId,
        ref : 'users',
    },
    is_active : {
        type: Number,
        require: true,
        default : 1, 
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

const MessageModel = model<MessageInt & Document>('Message', MessageSchema);

export default MessageModel;
