import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VisitEntity} from "./visit.entity";
import {Repository} from "typeorm";
import {VisitBuildingDto} from "./utils/interfaces/visit-building-dto";
import {AchievementEntity} from "../achievements/achievement.entity";
import {BuildingEntity} from "../buldings/building.entity";
import {AchievementsService} from "../achievements/achievements.service";
import {BuildingsService} from "../buldings/buildings.service";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(VisitEntity)
        private readonly visitRepo: Repository<VisitEntity>,
        private buildingsService: BuildingsService,
        private achievementsService: AchievementsService
    ) {
    }

    public async createVisit(visit_body: VisitBuildingDto, userId: number): Promise<VisitEntity> {
        const building: BuildingEntity = await this.buildingsService.getBuildingById(visit_body.building_id)

        if (!building) {
            throw new BadRequestException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        const previousVisit: VisitEntity = await this.visitRepo.findOneBy({
            building: {id: visit_body.building_id},
            user: {id: userId}
        });

        const visit: VisitEntity = this.visitRepo.create({
            building: {id: visit_body.building_id},
            user: {id: userId},
            visit_date: new Date().toISOString(), // or use another method to set the date appropriately
        });

        if (!previousVisit) {
            const saved = await this.visitRepo.save(visit);

            await this.achievementsService.createAchievement(
                userId,
                'building.name',
                visit
            )

            return saved
        }

        return this.visitRepo.save(visit)


    }

    public async getVisits(): Promise<VisitEntity[]> {
        return await this.visitRepo.find()
    }
}