import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {entities, modules} from "./modules/modules.index";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./shared/utils/constants/jwt-constants";
import {RolesGuard} from "./guards/roles/roles.guard";
import {JwtGuard} from "./guards/jwt/jwt.guard";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path'

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'frontend/building-scanner-fe/browser'),
        }),
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
        ...modules,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '2h' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService, RolesGuard, JwtGuard],
})
export class AppModule {
}
