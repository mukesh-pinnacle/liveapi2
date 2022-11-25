
import { CustomAttributeDto } from "@/dtos/app/custom_attribute.dto";
import { MessageDto } from "@/dtos/app/message.dto";
import { HttpException } from "@/exceptions/HttpException";
import { MessageInt } from "@/interfaces/app/message.interface";
import MessageModel from "@/models/app/message.model";
import { isEmpty } from "@/utils/util";
import { Types } from "mongoose";

class MessageService {
    public messageModel = MessageModel;
    //create record
    public async createMessage(accountId: string, messageData: MessageDto): Promise<MessageInt> {
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account id is invalid');
        if (isEmpty(messageData)) throw new HttpException(400, 'Message Data is empty');
        const findmessageid: MessageInt = await this.messageModel.findOne({ $and: [{ conversation_id: messageData.conversation_id, account_id: accountId }] });
        if (findmessageid) throw new HttpException(409, `The Conversation id : ${messageData.conversation_id}  for account ${accountId} is already exists`);
        const createData = {
            account_id: accountId,
            ...messageData
        };
        const getMessageData: MessageInt = await this.messageModel.create(createData);
        return getMessageData;
    };
    // Assign chat to agent
    public async createAssignToAgent(accountId: string, messageData: MessageDto): Promise<MessageInt> {
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account id is invalid');
        if (isEmpty(messageData)) throw new HttpException(400, 'Message Data is empty');
        if (messageData.content_type == 1) {
           /// const findmessageid: MessageInt = await this.messageModel.findOne({ $and: [{ conversation_id: messageData.conversation_id, account_id: accountId }] });
            //if (findmessageid) throw new HttpException(409, `The Conversation id : ${messageData.conversation_id}  for account ${accountId} is already exists`);
        }
        const findmessageid: MessageInt = await this.messageModel.findOne({ $and: [{ conversation_id: messageData.conversation_id, account_id: accountId }] });
        console.log("service ==  > ", findmessageid);
        if (findmessageid) throw new HttpException(409, `The Conversation id : ${messageData.conversation_id}  for account ${accountId} is already exists`);
        const createData = {
            account_id: accountId,
            ...messageData
        };
        const getMessageData: MessageInt = await this.messageModel.create(createData);
        return getMessageData;
    };


}
export default MessageService;