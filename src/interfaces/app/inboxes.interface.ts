import { ObjectId } from "mongoose";

export interface Inboxes {
    _id: Number;
    channel_type_id: ObjectId;
    account_id: ObjectId;
    name: String;
    is_active: Number;
    created_at: Date;
    updated_at: Date;
}