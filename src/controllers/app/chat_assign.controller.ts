import { NextFunction, Request, Response } from 'express';
import { ChatAssignDto } from '@dtos/app/chat_assign.dto';
//import { Team } from '@interfaces/team.interface';
import ChatAssignService from '@services/chat_assing.service';
import { ChatAssign } from '@/interfaces/app/chat_assign.interface';

class ChatAssignController {
    public chatAssignService = new ChatAssignService();
    public createChatAssign = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const chatassignData: ChatAssignDto = req.body;
          const accountId: string = req.params.accountid;
          const createInboxData: ChatAssign = await this.chatAssignService.createChatAssing(accountId, chatassignData);
          res.status(201).json({ data: createInboxData, message: 'Chat Assigne Create', statusCode: 201 });
        } catch (error) {
          next(error);
        }
      };

    
      public getChatAssignByConversationId = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const conversation_id: string = req.params.id;
          const accountId: string = req.params.accountid;
          const findChatAssignData: ChatAssign = await this.chatAssignService.findByConversationId(conversation_id, accountId);
          res.status(200).json({ data: findChatAssignData, message: 'Find Chat Assign by Conversation id', statusCode: 200 });
        } catch (error) {
          next(error);
        }
      };
    
     
      public updateChatAssign = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const chatassginid: string = req.params.id;
          const inboxData: ChatAssignDto = req.body;
          const accountId: string = req.params.accountid;
          const updateInboxData: ChatAssign = await this.chatAssignService.updateChatAssign(chatassginid, accountId, inboxData);
          res.status(200).json({ data: updateInboxData, message: 'Chat Assign updated', statusCode: 201 });
        } catch (error) {
          next(error);
        }
      };
   
}

export default ChatAssignController;
