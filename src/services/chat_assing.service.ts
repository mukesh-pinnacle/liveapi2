
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
    public async createChatAssing(accountId: string, conversationId: string ,chatassignData: ChatAssignDto): Promise<ChatAssign> {
        if (isEmpty(chatassignData)) throw new HttpException(400, 'inboxData is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(conversationId)) throw new HttpException(400, 'Conversation id is empty');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
        if (!Types.ObjectId.isValid(conversationId)) throw new HttpException(400, 'Conversation id is invalid');
        console.log("chatassignData = ",JSON.stringify(chatassignData));
        console.log("chatassignData.is_team = ",JSON.stringify(chatassignData.is_team));
        var createChatAssignData;
        if ( chatassignData.is_team === 1 ) 
        {
            if (isEmpty(chatassignData.team_id) || chatassignData.team_id === "null") throw new HttpException(400, 'team_id is null');
        }
            createChatAssignData = {
                "account_id": accountId,
                "conversation_id" : conversationId,
                "is_active_chat": 1,
                ...chatassignData
            };
        const createChatAssing: ChatAssign = await this.chatAssignModel.create(createChatAssignData);
        return createChatAssing;
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
