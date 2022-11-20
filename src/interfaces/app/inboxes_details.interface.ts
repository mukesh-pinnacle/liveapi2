import { ObjectId } from "mongoose";

export interface InboxesDetails {
    _id: Number;
    inboxes_id: ObjectId;
    account_id: ObjectId;
    created_at: Date;
    updated_at: Date;
    enable_auto_assignment: Boolean;
    greeting_enabled: Boolean;
    greeting_message: String;
    email_address: String;
    working_hours_enabled: Boolean;
    out_of_office_message: String;
    timezone: String;
    csat_survey_enabled: Boolean;
    allow_messages_after_resolved: Boolean;
    }