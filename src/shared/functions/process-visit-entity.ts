import {VisitEntity} from "../../modules/visits/visit.entity";
import {BuildingDto} from "../response-models/building-dto";
import {VisitDto} from "../response-models/visit-dto";
import {processUserEntity} from "./process-user-entity";
import {BuildingEntity} from "../../modules/buldings/building.entity";
import {UserEntity} from "../../modules/users/user.entity";

export function processVisitEntity(visit: VisitEntity, user: UserEntity): VisitDto {
    const building: BuildingEntity = visit.building;

    const buildingDto: BuildingDto = {
        id: building.id,
        name: building.name,
        description: building.description,
        location: building.location,
        qr_code: building.qr_code,
        created_at: building.created_at,
        updated_at: building.updated_at,
        created_by: processUserEntity(visit.user),
        visits_count: building.visits.length,
        visited: building.visits.some(visit => visit.user.id === user.id)
    };

    return {
        id: visit.id,
        visit_date: visit.visit_date,
        user: processUserEntity(user),
        achievement: visit.achievement,
        building: buildingDto
    }
}