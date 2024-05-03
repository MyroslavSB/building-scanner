import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UsersModule} from "../entities/users/users.module";
import {BuildingsModule} from "../entities/buldings/buildings.module";
import {VisitsModule} from "../entities/visits/visits.module";
import {entities, modules} from "../entities/entities.index";
import {MessagesModule} from "../entities/messages/messages.module";

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
                entities: entities,
                synchronize: true,
            }),
            inject: [ConfigService]
        }),
        ...modules
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
