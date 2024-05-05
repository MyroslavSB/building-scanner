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

        const visit = this.visitRepo.create({
            building: { id: visit_body.building_id },
            user: { id: userId },
            visit_date: new Date().toISOString(), // or use another method to set the date appropriately
        });

        const previousVisit: VisitEntity = await this.visitRepo.findOneBy({
            building: {id: visit_body.building_id},
            user: {id: userId}
        });

        if (!previousVisit) {
            await this.achievementsService.createAchievement(
                userId,
                'building.name',
                visit.visit_date,
                visit.id
            )
        }

        try {
            return await this.visitRepo.save(visit);
        } catch (error) {
            // Check the error type to see if it is a duplicate entry
            if (error.code === 'ER_DUP_ENTRY' || error.driverError?.code === 'ER_DUP_ENTRY') {
                // You can customize the error message as needed
                throw new HttpException('This email is already registered.', HttpStatus.BAD_REQUEST);
            }
            // Rethrow the error if it's not related to duplicate entry
            throw error;
        }
    }

    public async getVisits(): Promise<VisitEntity[]> {
        return await this.visitRepo.find()
    }
}