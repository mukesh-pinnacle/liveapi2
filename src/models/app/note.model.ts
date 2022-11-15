import { model, Schema, Document } from 'mongoose';
import { Note } from '@/interfaces/note.interface';



const NoteSchema: Schema = new Schema({
    
    account_id: { 
        //type:Number,
        type: Schema.Types.ObjectId, 
        ref: 'accounts',
        required: true, 
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'users',
        required: true, 
    },
    contact_id: {
        type: Schema.Types.ObjectId, 
        ref: 'contacts',
        required: true, 
    },
    content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
  

});


const NoteModel = model<Note & Document>('Note', NoteSchema);

export default NoteModel;
