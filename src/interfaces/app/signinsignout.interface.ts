import { ObjectId } from "mongoose";

export interface SigninSignoutInt {
    _id: Number;
    user_id: ObjectId;
    account_id: ObjectId;
    signin_at: Date;
    signout_at: Date;
}