import { ObjectId } from "mongoose";

export interface InboxesShiftDetails {
    _id: Number;
    inboxes_id: ObjectId;
    account_id: ObjectId;
    shift_type: String;
    name: String;
    description: String;
    to_time: String;
    from_time: String;
    is_active: Number;
    created_at: Date;
    updated_at: Date;
}