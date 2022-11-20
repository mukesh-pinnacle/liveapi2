import { ObjectId } from "mongoose";

export interface InboxesShiftDetails {
    _id: Number;
    inboxes_details_id: ObjectId;
    account_id: ObjectId;
    shift_type: String;
    name: String;
    description: String;
    to_time: Date;
    from_time: Date;
    is_active: Number;
    created_at: Date;
    updated_at: Date;
}