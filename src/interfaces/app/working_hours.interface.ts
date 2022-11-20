import { ObjectId } from "mongoose";

export interface WorkingHours {
    _id: Number;
    inboxes_details_id: ObjectId;
    inboxes_shift_id: ObjectId;
    account_id: ObjectId;
    created_at: Date;
    updated_at: Date;
}