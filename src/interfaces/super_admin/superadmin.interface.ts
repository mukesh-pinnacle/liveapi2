export interface Superadmin {
  _id: string;
  name: string;
  email: string;
  password: string;
  displayname: string;
  is_active: number;
  is_subsuperAdmin: number;
  created_at: Date;
  updated_at: Date;
}
