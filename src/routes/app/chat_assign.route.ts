import { Router } from 'express';
import ChatAssignController from '@controllers/app/chat_assign.controller';
import { ChatAssignDto } from '@dtos/app/chat_assign.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@/middlewares/auth.middleware';



class ChatAssignRoute implements Routes {
    public path = '/app';
    public router: Router = Router();
    public Controller = new ChatAssignController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}/accounts/:accountId/chat-assign`, [validationMiddleware(ChatAssignDto, 'body', true), authMiddleware],
        //  this.Controller.getChatAssign);
        this.router.get(`${this.path}/accounts/:accountid/chat-assign/conversation/:id`, [validationMiddleware(ChatAssignDto, 'body', true), authMiddleware], 
        this.Controller.getChatAssignByConversationId);
        this.router.post(`${this.path}/accounts/:accountid/chat-assign`, [validationMiddleware(ChatAssignDto, 'body', true), authMiddleware],
        this.Controller.createChatAssign);
         this.router.put(`${this.path}/accounts/:accountid/chat-assign/:id`, [validationMiddleware(ChatAssignDto, 'body', true), authMiddleware], 
         this.Controller.updateChatAssign);
        // this.router.delete(`${this.path}/accounts/:accountId/chat-assign/:id`, [validationMiddleware(ChatAssignDto, 'body', true), authMiddleware], 
        // this.cannedResController.deleteCannedRes);
    }
}

export default ChatAssignRoute;
