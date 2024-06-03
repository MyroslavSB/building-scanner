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
            rootPath: join(__dirname, '..', 'frontend', 'building-scanner-fe', 'browser'),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10) || 3306,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
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
