import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "process";

const parseDatabaseUrl = (databaseUrl: string) => {
    const [full, username, password, host, port, database] = databaseUrl.match(
        /mysql:\/\/(.*?):(.*?)@(.*?):(\d+)\/(.*)/
    );
    return {username, password, host, port, database};
};

const dbConfig = parseDatabaseUrl(process.env.JAWSDB_URL);
process.env.DB_HOST = dbConfig.host;
process.env.DB_PORT = dbConfig.port;
process.env.DB_USERNAME = dbConfig.username;
process.env.DB_PASSWORD = dbConfig.password;
process.env.DB_DATABASE = dbConfig.database;


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    if (process.env.JAWSDB_URL) {
        const dbConfig = parseDatabaseUrl(process.env.JAWSDB_URL);
        process.env.DB_HOST = dbConfig.host;
        process.env.DB_PORT = dbConfig.port.toString();
        process.env.DB_USERNAME = dbConfig.username;
        process.env.DB_PASSWORD = dbConfig.password;
        process.env.DB_DATABASE = dbConfig.database;
    }
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }))


    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    });

    app.setGlobalPrefix('/api')
    const config = new DocumentBuilder()
        .setTitle('Building scanner')
        .setDescription('The building scanner API description')
        .addBearerAuth(
            {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
            'access_token',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
