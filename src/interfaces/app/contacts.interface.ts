import { ObjectId } from "mongoose";

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  account_id: ObjectId;
  created_at: Date;
  updated_at: Date;
  pubsub_token: string;
  additional_attributes: Object;
  identifier: string;
  custom_attributes: Object;
  last_activity: Date;
  file_name: string;
  file_url: string;
}
