
import { ChatAssign } from '@/interfaces/app/chat_assign.interface';
import { HttpException } from '@exceptions/HttpException';
import ChatAssignModel from '@/models/app/chat_assign.model';
import { isEmpty } from '@utils/util';
import { ObjectId, Types } from 'mongoose';
import { ChatAssignDto } from '@/dtos/app/chat_assign.dto';
//import { Types } from 'mongoose';

class ChatAssignService {
    public chatAssignModel = ChatAssignModel;
    //created 
    public async createChatAssing(accountId: string, chatassignData: ChatAssignDto): Promise<ChatAssign> {
        if (isEmpty(chatassignData)) throw new HttpException(400, 'inboxData is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
        var createChatAssignData;
        if (chatassignData.is_team === 0) {
            createChatAssignData = {
                "account_id": accountId,
                ...chatassignData
            };
        }
        else if (chatassignData.is_team === 1) {
            console.log(" iam here");
            createChatAssignData = {
                "account_id": accountId,
                "team_id": "Null",
                ...chatassignData
            };
        }
        const createinboxData: ChatAssign = await this.chatAssignModel.create(createChatAssignData);
        return createinboxData;
    }

    

    public async findByConversationId(conversationId: string, accountId: string): Promise<ChatAssign> {
        if (isEmpty(conversationId)) throw new HttpException(400, 'Conversation Id is empty');
        if (!Types.ObjectId.isValid(conversationId)) throw new HttpException(400, 'Conversation Id is invalid');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
        const findChatAssignByConvID: ChatAssign = await this.chatAssignModel.findOne({ conversation_id: conversationId, account_id: accountId });
        if (!findChatAssignByConvID) throw new HttpException(409, `Chat Assign doesn't exist for given Conversation ${conversationId}`);
        return findChatAssignByConvID;
    }


    public async updateChatAssign(chatassginid: string, accountId: string, chatassignData: ChatAssignDto): Promise<ChatAssign> {
        if (isEmpty(chatassignData)) throw new HttpException(400, 'Chat Assign Data is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(chatassginid)) throw new HttpException(400, 'Chat Assign id is empty');
        if (!Types.ObjectId.isValid(chatassginid)) throw new HttpException(400, 'Inboxes Id is invalid');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
       
        const updateChatData: ChatAssign = await this.chatAssignModel.findByIdAndUpdate({ _id: chatassginid, account_id: accountId },
            { $set: chatassignData, updated_at: Date.now() }, { new: true, runValidators: true });
        if (!updateChatData) throw new HttpException(409, "Inboxes doesn't exist");
        return updateChatData;
    }

}


export default ChatAssignService;
