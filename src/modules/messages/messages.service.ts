import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "./message.entity";
import {Repository} from "typeorm";
import {ICreateMessageBody} from "./utils/interfaces/i-create-message-body";
import {BuildingEntity} from "../buldings/building.entity";
import {UserEntity} from "../users/user.entity";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity) private readonly messageRepo: Repository<MessageEntity>
    ) {
    }

    public async createMessage(message_body: ICreateMessageBody, user_id: number): Promise<MessageEntity> {
        try {
            const message = new MessageEntity();
            message.text = message_body.text;
            message.building = {id: message_body.building_id} as BuildingEntity; // Set building by ID
            message.user = {id: user_id} as UserEntity; // Set user by ID
            message.created_at = new Date(); // Set created date


            return this.messageRepo.save(message);
        } catch (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW' || error.code === 'ER_NO_REFERENCED_ROW_2') {
                // Handle foreign key error
                throw new NotFoundException('The provided building_id or user_id does not exist.');
            }
            throw error;
        }


    }

    public async getMessages(): Promise<MessageEntity[]> {
        return await this.messageRepo.find()
    }
}