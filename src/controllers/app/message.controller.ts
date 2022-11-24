import { MessageDto } from "@/dtos/app/message.dto";
import { MessageInt } from "@/interfaces/app/message.interface";
import MessageService from "@/services/message.service";
import { NextFunction, Request, Response } from "express";
import { stringify } from "querystring";
class MessageController {
    public messageService = new MessageService();
    //create Custom Attribute for contact / conversation
    public createMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const messageData: MessageDto = req.body;
            const accountId: string = req.params.accountid;
            const getMessageData: MessageInt = await this.messageService.createMessage(accountId, messageData);
            res.status(201).json({ data: getMessageData, message: 'Message Created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    }

    public createAssignToAgent = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const messageData: MessageDto = req.body;
                const accountId: string = req.params.accountid;
                const getMessageData: MessageInt = await this.messageService.createAssignToAgent(accountId, messageData);
                res.status(201).json({ data: getMessageData, message: 'Message Created with assignToAgent', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    }
}
    
export default MessageController;