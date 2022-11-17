import { Router } from 'express';
import NoteController from '@controllers/app/note.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';
import { NoteDto } from '@/dtos/app/note.dto';


class NoteRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public noteController = new NoteController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}/accounts/:accountid/notes`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.createNote);
        this.router.get(`${this.path}/accounts/:accountid/user/:userid/contactid/:contactid`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.getNotes);
        this.router.put(`${this.path}/accounts/:accountid/notes/:id`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.updateNote);
        this.router.delete(`${this.path}/accounts/:accountid/notes/:id`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.deleteNote);
    }
}

export default NoteRoute;