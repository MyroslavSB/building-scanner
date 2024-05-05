import {UserEntity} from "./users/user.entity";
import {BuildingEntity} from "./buldings/building.entity";
import {VisitEntity} from "./visits/visit.entity";
import {MessageEntity} from "./messages/message.entity";
import {BuildingsModule} from "./buldings/buildings.module";
import {MessagesModule} from "./messages/messages.module";
import {UsersModule} from "./users/users.module";
import {VisitsModule} from "./visits/visits.module";
import {AchievementsModule} from "./achievements/achievements.module";
import {AchievementEntity} from "./achievements/achievement.entity";

export const entities = [
    BuildingEntity,
    MessageEntity,
    UserEntity,
    VisitEntity,
    AchievementEntity
];

export const modules = [
    BuildingsModule,
    MessagesModule,
    UsersModule,
    VisitsModule,
    AchievementsModule
];