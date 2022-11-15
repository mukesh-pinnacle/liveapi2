export interface Account {
  _id: string;
  name: string;
  domain: string;
  suport_email: string;
  locale: number;
  auto_resolve_duration: number;
  limits: number;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
