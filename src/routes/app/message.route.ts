import { Router } from 'express';
import MessageController from '@controllers/app/message.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';
import { MessageDto } from '@/dtos/app/message.dto';


class MessageRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public Controller = new MessageController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}/accounts/:accountid/messages`, [validationMiddleware(MessageDto, 'body', true), authMiddleware],
         this.Controller.createMessage);
        this.router.post(`${this.path}/accounts/:accountid/messages/assigntoagent`, [validationMiddleware(MessageDto, 'body', true), authMiddleware],
         this.Controller.createAssignToAgent);
      
    }
}

export default MessageRoute;