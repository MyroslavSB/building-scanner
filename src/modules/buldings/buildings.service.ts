import {BadRequestException, ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BuildingEntity} from "./building.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";
import {BuildingDto} from "../../shared/response-models/building-dto";
import {UserDto} from "../../shared/response-models/user-dto";
import {UserEntity} from "../users/user.entity";
import {processUserEntity} from "../../shared/functions/process-user-entity";
import {processBuildingEntity} from "../../shared/functions/process-building-entity";

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(BuildingEntity) private buildingRepo: Repository<BuildingEntity>,
    ) {
    }

    public async createBuilding(building_body: CreateBuildingDto, user: UserEntity): Promise<BuildingDto> {
        const building: BuildingEntity = this.buildingRepo.create({
            ...building_body,
            created_by: user
        })

        const building_present: BuildingEntity = await this.getBuildingByName(building.name)

        if (!!building_present) {
            throw new BadRequestException(EBadRequestMessages.EXISTING_BUILDING_NAME);
        }

        const {
            id,
            name,
            description,
            location,
            created_at,
            updated_at,
            qr_code
        } = await this.buildingRepo.save(building)

        const created_by: UserDto = processUserEntity(user)
        created_by.created_buildings_count = created_by.created_buildings_count + 1

        const buildingDto: BuildingDto = {
            id,
            name,
            description,
            location,
            created_at,
            updated_at,
            qr_code,
            visited: false,
            visits_count: 0,
            created_by
        }

        try {
            return buildingDto

        } catch (error) {
            throw error;
        }
    }

    public async getBuildingByName(building_name: string): Promise<BuildingEntity> {
        return await this.buildingRepo.findOneBy({
            name: building_name
        })
    }


    public async getBuildings(user: UserEntity): Promise<BuildingDto[]> {
        return [...await this.getRawBuildings()].map(building => {
            return processBuildingEntity(building, user.id)
        })
    }

    public async updateBuilding(buildingId: number, buildingBody: CreateBuildingDto, user: UserEntity): Promise<BuildingDto> {
        const building: BuildingDto = await this.getBuildingById(buildingId, user);

        if (!building) {
            throw new BadRequestException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        let buildingName: string = buildingBody.name;
        let buildingDesc: string = buildingBody.description;

        if (!buildingBody.name) {
            buildingName = building.name;
        }

        if (!buildingBody.description) {
            buildingDesc = building.description;
        }

        try {
            if (buildingName) {
                await this.buildingRepo.update({id: buildingId}, {name: buildingName});
            }

            if (buildingDesc) {
                await this.buildingRepo.update({id: buildingId}, {description: buildingDesc});
            }

            return processBuildingEntity(await this.getBuildingEntityById(buildingId, user), user.id);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(EBadRequestMessages.EXISTING_BUILDING_NAME);
            }
            throw error;
        }

    }

    public async deleteBuilding(buildingId: number, user: UserEntity): Promise<DeleteResult> {
        const building: BuildingDto = await this.getBuildingById(buildingId, user);
        if (!building) {
            throw new NotFoundException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        try {
            return this.buildingRepo.delete({id: buildingId});
        } catch (error) {
            throw error;
        }
    }

    private findUserBuildings(user_id: number): Promise<BuildingEntity[]> {
        return this.buildingRepo.find({
            where: {
                created_by: {id: user_id}
            }
        })
    }

    public async getBuildingById(building_id: number, user: UserEntity): Promise<BuildingDto> {
        const building: BuildingEntity = await this.buildingRepo.findOne({
            where: {
                id: building_id
            },
            relations: ['visits', 'visits.user', 'created_by', 'created_by.visits', 'created_by.buildings', 'created_by.achievements']
        })

        if (!building) {
            throw new NotFoundException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        return processBuildingEntity(building, user.id);
    }

    private async getBuildingEntityById(building_id: number, user: UserEntity): Promise<BuildingEntity> {
        const building: BuildingEntity = await this.buildingRepo.findOne({
            where: {
                id: building_id
            },
            relations: ['visits', 'created_by', 'created_by.visits', 'created_by.buildings', 'created_by.achievements']
        })

        if (!building) {
            throw new NotFoundException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        return building
    }

    private async getRawBuildings(): Promise<BuildingEntity[]> {
        return this.buildingRepo.find({
            relations: ['visits', 'visits.user', 'created_by', 'created_by.visits', 'created_by.buildings', 'created_by.achievements']
        })

    }

    public async getBuildingWithRelations(buildingId: number): Promise<BuildingEntity> {
        return this.buildingRepo.findOne({
            where: {id: buildingId},
            relations: ['visits', 'visits.user', 'created_by', 'created_by.visits', 'created_by.buildings', 'created_by.achievements']
        })
    }
}