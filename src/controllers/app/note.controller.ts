import { NoteDto } from "@/dtos/app/note.dto";
import { Note } from "@/interfaces/app/note.interface";
import NoteService from "@/services/note.service";
import { NextFunction, Request, Response } from "express";
class NoteController {
    public noteService = new NoteService();
    //create Notes for contact 
    public createNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const noteData: NoteDto = req.body;
            const accountId: string =req.params.accountid;
            const createNoteData: Note = await this.noteService.createNote(accountId,noteData);
            res.status(201).json({ data: createNoteData, message: 'created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    }
    public getNotes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const userid: string = req.params.userid;
            const contactid: string = req.params.contactid
            // console.log("hello from notes controller");
            const findNoteData: Note[] = await this.noteService.findNotes(accountid, userid, contactid);
            res.status(200).json({ data: findNoteData, message: 'findNotes', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }
    // update Notes By Object ID
    public updateNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const noteData: NoteDto = req.body;
            const accountId: string = req.params.accountid;
            const updateNotes: Note = await this.noteService.updateNote(accountId, id, noteData);
            res.status(200).json({ data: updateNotes, message: 'UpdateNotes', statusCode: 200 });

        } catch (error) {
            next(error);
        }
    }
    // delete Notes By Object ID
    public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const Id: string = req.params.id;
          const accountId: string = req.params.accountid;
          const deleteNoteData: Note = await this.noteService.deleteNote(accountId, Id);
          console.log(Id);
          res.status(200).json({ data: deleteNoteData, message: 'delete Note', statusCode: 200 });
        } catch (error) {
          next(error);
        }
      };

}
export default NoteController;