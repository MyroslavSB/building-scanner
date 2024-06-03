import {AchievementEntity} from "../../modules/achievements/achievement.entity";
import {AchievementDto} from "../response-models/achievement-dto";
import {processUserEntity} from "./process-user-entity";
import {processVisitEntity} from "./process-visit-entity";

export function processAchievementEntity(achievement: AchievementEntity): AchievementDto {
    const {id, description, title, obtained_date, user, visit} = achievement
    return {
        id,
        description,
        title,
        obtained_date,
        user: processUserEntity(user),
        visit: processVisitEntity(visit, user)
    }
}
