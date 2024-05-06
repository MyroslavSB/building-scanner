import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {entities, modules} from "./modules/modules.index";
import { AuthController } from './modules/auth/auth.controller';
import {AuthService} from "./modules/auth/auth.service";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./shared/utils/constants/jwt-constants";
import {RolesGuard} from "./guards/roles/roles.guard";
import {JwtGuard} from "./guards/jwt/jwt.guard";

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
        ...modules,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, RolesGuard, JwtGuard],
})
export class AppModule {
}
