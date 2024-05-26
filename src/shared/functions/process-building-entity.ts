import {BuildingEntity} from "../../modules/buldings/building.entity";
import {BuildingDto} from "../response-models/building-dto";
import {UserDto} from "../response-models/user-dto";

export function processBuildingEntity(building: BuildingEntity, userId: number): BuildingDto {
    const created_by = this.toUserDto(building.created_by);
    const visits_count = building.visits.length;
    const visited = building.visits.some(visit => visit.user.id === userId);

    return {
        id: building.id,
        name: building.name,
        description: building.description,
        location: building.location,
        qr_code: building.qr_code,
        created_at: building.created_at,
        updated_at: building.updated_at,
        created_by: created_by,
        visits_count: visits_count,
        visited: visited
    };
}