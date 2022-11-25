import { model, Schema, Document } from 'mongoose';
import { ChatAssign } from '@interfaces/app/chat_assign.interface';

const chatAssignSchema: Schema = new Schema({
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'accounts',
        required: true, 
    },
    conversation_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Conversations',
        required: true, 
    },
    is_team:  {
        type: Number,
        required: false,
        default: 0,
    },
    team_id: {
        type: String,
        ref: 'Team',
        required: true,
    },
    assignee_id : {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    is_active_chat:{
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

const ChatAssignModel = model<ChatAssign & Document>('ChatAssign', chatAssignSchema);

export default ChatAssignModel;