export interface MessageInt {
    _id: string;
    account_id: Object;
    inbox_id : Object;
    conversation_id: Object;
    chat_assign_Id : Object;
    message_type: Number;
    content: String;
    media_path : String;
    is_private : Number;
    content_type : Number;
    sender_type : Number;
    sender_id : Object;
    is_active : Number;
    created_at: Date;
    updated_at: Date;
}
