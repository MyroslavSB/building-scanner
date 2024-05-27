import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BuildingEntity} from "./building.entity";
import {Repository} from "typeorm";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {UserEntity} from "../users/user.entity";
import {VisitEntity} from "../visits/visit.entity";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";
import {BuildingDto} from "../../shared/response-models/building-dto";
import {processUserEntity} from "../../shared/functions/process-user-entity";
import {UserDto} from "../../shared/response-models/user-dto";

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(BuildingEntity) private buildingRepo: Repository<BuildingEntity>,
    ) {
    }

    public async createBuilding(building_body: CreateBuildingDto, user: UserDto): Promise<BuildingDto> {
        const building: BuildingEntity = this.buildingRepo.create({
            ...building_body,
            created_by: user
        })

        const building_present: BuildingEntity = await this.getBuildingByName(building.name)

        if (!!building_present) {
            throw new BadRequestException(EBadRequestMessages.EXISTING_BUILDING_NAME);
        }

        const {id, name, description, location, created_at, updated_at, qr_code} = await this.buildingRepo.save(building)

        user.created_buildings_count = user.created_buildings_count + 1
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
            created_by: user
        }

        try {
            return buildingDto

        } catch (error) {
            throw error;
        }
    }

    public async getBuildingById(building_id: number): Promise<BuildingEntity> {
        const building: BuildingEntity = await this.buildingRepo.findOneBy({
            id: building_id
        })

        if (!building) {
            throw new NotFoundException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        return building;
    }

    public async getBuildingByName(building_name: string): Promise<BuildingEntity> {
        return await this.buildingRepo.findOneBy({
            name: building_name
        })
    }


    public async getBuildings(): Promise<BuildingEntity[]> {
        // const buildings: BuildingEntity[] = this.buildingRepo.find();

        return this.buildingRepo.find()

        // return Promise.all(buildings.map(async (building) => {
        //     console.log(visits)
        //     const user_visits: VisitEntity[] = visits.filter(visit => visit.user.id === user.id);
        //     console.log('user_visits: ', user_visits);
        //
        //     const user_buildings: BuildingEntity[] = await this.findUserBuildings(user.id);
        //     console.log('user_buildings: ', user_buildings);
        //
        //     const processed_user: UserDto = processUserEntity(user, user_visits.length, user_buildings.length);
        //     console.log('processed_user: ', processed_user);
        //
        //     const building_visits: VisitEntity[] = visits.filter(visit => visit.building.id === building.id);
        //     console.log('building_visits: ', building_visits);
        //
        //     return processBuildingEntity(building, processed_user, building_visits.length, user_visits.some(visit => visit.building.id === building.id));
        // }));
    }

    public async updateBuilding(buildingId: number, buildingBody: CreateBuildingDto) {
        const building: BuildingEntity = await this.getBuildingById(buildingId);

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
                //return await this.buildingRepo.save(building);
            }

            if (buildingDesc) {
                await this.buildingRepo.update({id: buildingId}, {description: buildingDesc});
                //return await this.buildingRepo.save(building);
            }

        } catch (error) {
            throw error;
        }

    }

    public async deleteBuilding(buildingId: number) {
        const building: BuildingEntity = await this.getBuildingById(buildingId);
        if (!building) {
            throw new NotFoundException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        try {
            await this.buildingRepo.delete({id: buildingId});
            return null;
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
}