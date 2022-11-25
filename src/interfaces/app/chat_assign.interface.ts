import { ObjectId } from "mongoose";

export interface ChatAssign {
    _id: Object;
    account_id: Number;
    conversation_id: ObjectId;
    is_team: Number;
    team_id: ObjectId;
    assignee_id : ObjectId;
    is_active_chat: Number;
    created_at: Date;
    updated_at: Date;
   
}