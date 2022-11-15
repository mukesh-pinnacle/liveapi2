export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  displayname: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
