import {UserEntity} from "../../modules/users/user.entity";
import {UserDto} from "../response-models/user-dto";

export function processUserEntity(user: UserEntity): UserDto {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        visits_count: user.visits.length,
        created_buildings_count: user.buildings.length,
        achievements_count: user.achievements.length
    };
}