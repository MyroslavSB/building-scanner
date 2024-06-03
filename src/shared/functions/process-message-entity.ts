import {MessageEntity} from "../../modules/messages/message.entity";
import {MessageDto} from "../response-models/message-dto";
import {processUserEntity} from "./process-user-entity";
import {processBuildingEntity} from "./process-building-entity";
import {BuildingDto} from "../response-models/building-dto";

export function processMessageEntity(message: MessageEntity, processed_building?: BuildingDto): MessageDto {
    const {id, created_at, text} = message

    return {
        id,
        created_at,
        text,
        building: processed_building ? processed_building : processBuildingEntity(message.building, message.user.id),
        user: processUserEntity(message.user),
    }
}