export interface AccountUser {
  _id: string;
  account_id: string;
  user_id: string;
  role: number;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
