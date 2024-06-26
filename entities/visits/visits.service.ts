import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VisitEntity} from "./visit.entity";
import {Repository} from "typeorm";
import {ICreateVisitBody} from "./utils/interfaces/i-create-visit-body";
import {AchievementEntity} from "../achievements/achievement.entity";
import {BuildingEntity} from "../buldings/building.entity";
import {AchievementsService} from "../achievements/achievements.service";
import {BuildingsService} from "../buldings/buildings.service";

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(VisitEntity)
        private readonly visitRepo: Repository<VisitEntity>,
        private buildingsService: BuildingsService,
        private achievementsService: AchievementsService
    ) {
    }

    public async createVisit(visit_body: ICreateVisitBody, userId: number): Promise<VisitEntity> {
        const building: BuildingEntity = await this.buildingsService.getBuildingById(visit_body.building_id)

        if (!building) {
            throw new HttpException('Such building doesn\'t exist', HttpStatus.BAD_REQUEST);
        }

        const previousVisit: VisitEntity = await this.visitRepo.findOneBy({
            building: {id: visit_body.building_id},
            user: {id: userId}
        });

        const visit = this.visitRepo.create({
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