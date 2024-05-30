import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "./message.entity";
import {DeleteResult, Repository} from "typeorm";
import {ICreateMessageBody} from "./utils/interfaces/i-create-message-body";
import {BuildingEntity} from "../buldings/building.entity";
import {UserEntity} from "../users/user.entity";
import {EUserRoles} from "../users/utils/enums/e-user-roles";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";
import {BuildingDto} from "../../shared/response-models/building-dto";
import {MessageDto} from "../../shared/response-models/message-dto";
import {processMessageEntity} from "../../shared/functions/process-message-entity";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity) private readonly messageRepo: Repository<MessageEntity>
    ) {
    }

    public async createMessage(message_body: ICreateMessageBody, user: UserEntity, building: BuildingDto): Promise<MessageDto> {

        if (user.visits.map(visit => visit.building.id).includes(message_body.building_id) || user.role === EUserRoles.ADMIN) {
            try {
                const message = new MessageEntity();
                message.text = message_body.text;
                message.user = user;
                message.building = {id: message_body.building_id} as BuildingEntity;
                message.created_at = new Date();

                return processMessageEntity(await this.messageRepo.save(message), building)
            } catch (error) {
                if (error.code === 'ER_NO_REFERENCED_ROW' || error.code === 'ER_NO_REFERENCED_ROW_2') {
                    // Handle foreign key error
                    throw new NotFoundException('The provided building_id or user_id does not exist.');
                }
                throw error;
            }
        } else {
            throw new UnauthorizedException(EBadRequestMessages.UNVISITED_BUILDING)
        }


    }

    public async getMessages(): Promise<MessageEntity[]> {
        return await this.messageRepo.find()
    }

    public async getMessagesByBuilding(buildingId: number): Promise<MessageEntity[]> {
        return await this.messageRepo.find({
            where: {
                building: {
                    id: buildingId,
                },
            },
            relations: ['building', 'user', 'user.visits'],
        });
    }

    public deleteBuildingMessages(building_id: number): Promise<DeleteResult> {
        return this.messageRepo.delete({building: {id: building_id}})

    }
}