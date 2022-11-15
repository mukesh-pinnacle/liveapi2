import { Router } from 'express';
import NoteController from '@controllers/note.controller';
import { TeamDto } from '@dtos/team.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';
import { NoteDto } from '@/dtos/note.dto';


class NoteRoute implements Routes {
    public path = '/notes';
    public router: Router = Router();
    public noteController = new NoteController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.createNote);
        this.router.get(`${this.path}/:accountid/:userid/:contactid`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.getNotes);
        this.router.put(`${this.path}/:id`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.updateNote);
        this.router.delete(`${this.path}/:id`, [validationMiddleware(NoteDto, 'body', true), authMiddleware], this.noteController.deleteNote);
    }
}

export default NoteRoute;