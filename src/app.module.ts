import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UsersModule} from "../entities/users/users.module";
import {UserEntity} from "../entities/users/user.entity";
import {BuildingEntity} from "../entities/buldings/building.entity";
import {BuildingsModule} from "../entities/buldings/buildings.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [UserEntity, BuildingEntity],
                synchronize: true,
            }),
            inject: [ConfigService]
        }),
        UsersModule,
        BuildingsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
