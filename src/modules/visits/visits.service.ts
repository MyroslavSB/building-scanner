import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VisitEntity} from "./visit.entity";
import {Repository} from "typeorm";
import {VisitBuildingDto} from "./utils/interfaces/visit-building-dto";
import {BuildingEntity} from "../buldings/building.entity";
import {AchievementsService} from "../achievements/achievements.service";
import {BuildingsService} from "../buldings/buildings.service";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";
import {UserEntity} from "../users/user.entity";
import {processVisitEntity} from "../../shared/functions/process-visit-entity";
import {VisitDto} from "../../shared/response-models/visit-dto";

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(VisitEntity)
        private readonly visitRepo: Repository<VisitEntity>,
        private buildingsService: BuildingsService,
        private achievementsService: AchievementsService
    ) {
    }

    public async createVisit(visit_body: VisitBuildingDto, user: UserEntity): Promise<VisitEntity> {
        const building: BuildingEntity = await this.buildingsService.getBuildingById(visit_body.building_id)

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

        if (!previousVisit) {
            const saved = await this.visitRepo.save(visit);

            await this.achievementsService.createAchievement(
                user,
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

    public async getUserVisits(userId: number): Promise<VisitDto[]> {
        const visits = await this.visitRepo.find({
            where: { user: { id: userId } },
            relations: ['building', 'building.created_by', 'building.visits', 'building.visits.user', 'achievement', 'user', 'user.visits', 'user.buildings']
        });

        // console.log(visits)

        return visits.map(visit => processVisitEntity(visit, userId));
    }

    public async getBuildingVisits(building_id: number): Promise<VisitEntity[]> {
        return await this.visitRepo.find({
            where: {
                building: {id: building_id}
            }
        })
    }}