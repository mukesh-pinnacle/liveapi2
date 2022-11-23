import { ObjectId } from "mongoose";

export interface WorkingHours {
    _id: Number;
    inboxes_id: ObjectId;
    account_id: ObjectId;
    day_of_week: Number;
    closed_all_day: Number;
    open_hour: Number;
    open_minutes: Number;
    close_hour: Number;
    closed_minutes: Number;
    created_at: Date;
    updated_at: Date;
}