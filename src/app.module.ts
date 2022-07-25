import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import configuration from "./config/configuration";
import { UserModule } from "./modules/user/user.module";
import { LoggerMiddleware } from "./common/middlewares/logs.middleware";
import { LoggerModule } from "./common/log/logger.module";
import { DatabaseModule } from "./database/database.module";
import validationSchema from "./config/validationSchema";
import { AuthenticationModule } from "./authentication/authentication.module";
import { APP_FILTER } from "@nestjs/core";
import { ExceptionsLoggerFilter } from "./common/filters/exceptionsLogger.filter";
import { BusinessModule } from './modules/business/business.module';
import { TransactionModule } from './modules/transaction/transaction.module';

console.log(`.env.${process.env.NODE_ENV}`);

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
            validationSchema,
            load: [configuration],
            isGlobal: true,
        }),
        DatabaseModule,
        UserModule,
        LoggerModule,
        AuthenticationModule,
        BusinessModule,
        TransactionModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
