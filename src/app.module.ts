import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import configuration from "./config/configuration";
import { typeOrmAsyncConfig } from "./config/typeorm.config";
import { UserModule } from "./modules/user/user.module";
import { SessionModule } from "./modules/session/session.module";
import { LoggerMiddleware } from "./common/middlewares/logs.middleware";

console.log(`.env.${process.env.NODE_ENV}`);

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        UserModule,
        SessionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
