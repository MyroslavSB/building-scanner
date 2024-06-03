import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VisitEntity} from "./visit.entity";
import {Repository} from "typeorm";
import {VisitBuildingDto} from "./utils/interfaces/visit-building-dto";
import {AchievementsService} from "../achievements/achievements.service";
import {BuildingsService} from "../buldings/buildings.service";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";
import {UserEntity} from "../users/user.entity";
import {processVisitEntity} from "../../shared/functions/process-visit-entity";
import {VisitDto} from "../../shared/response-models/visit-dto";
import {BuildingEntity} from "../buldings/building.entity";

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(VisitEntity)
        private readonly visitRepo: Repository<VisitEntity>,
        private buildingsService: BuildingsService,
        private achievementsService: AchievementsService
    ) {
    }

    public async createVisit(visit_body: VisitBuildingDto, user: UserEntity): Promise<VisitDto> {
        const building: BuildingEntity = await this.buildingsService.getBuildingWithRelations(visit_body.building_id)

        if (!building) {
            throw new BadRequestException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        const previousVisit: VisitEntity = await this.visitRepo.findOneBy({
            building: {id: visit_body.building_id},
            user: {id: user.id}
        });

        const visit: VisitEntity = this.visitRepo.create({
            building,
            user,
            visit_date: new Date().toISOString()
        });

        const saved: VisitEntity = await this.visitRepo.save(visit);

        if (!previousVisit) {
            await this.achievementsService.createAchievement(
                user,
                building.name,
                visit
            )
        }


        return processVisitEntity(saved, user)

    }

    public async getUserVisits(user: UserEntity): Promise<VisitDto[]> {
        const visits = await this.visitRepo.find({
            relations: [
                'building',
                'building.created_by',
                'building.visits',
                'building.visits.user',
                'achievement', 'user',
                'user.visits',
                'user.buildings',
                'user.achievements'
            ],
            where: {
                user: {id: user.id}
            },
            order: {
                visit_date: 'ASC'
            }
        })

        return visits.map(visit => {
            return processVisitEntity(visit, visit.user)
        });
    }

    public async deleteBuildingVisits(building: BuildingEntity): Promise<void> {
        const visitsIds: number[] = building.visits.map(visit => visit.id)
        await this.achievementsService.deleteVisitsAchievements(visitsIds);

        await this.visitRepo.delete({building: {id: building.id}});

    }
}