export interface Team {
    _id: string;
    account_id:number
    name : string;
    description:string;
    is_active: number;
    allow_auto_assign:boolean;
    created_at: Date;
    updated_at: Date;
  }
  