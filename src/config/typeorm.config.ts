// require("dotenv").config({ path: "pathToENV" });
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

import * as dotenv from "dotenv";
import DatabaseLogger from "../common/utils/databaseLogger";
dotenv.config({ path: ".env.development" });

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type: "postgres",

            host: configService.get("DATABASE_HOST"),
            port: parseInt(configService.get("DATABASE_PORT")),
            username: configService.get("DATABASE_USERNAME"),
            password: configService.get("DATABASE_PASSWORD"),
            database: configService.get("DATABASE_NAME"),

            entities: ["dist/**/**/*.entity.js"],

            synchronize: false,
            logger: new DatabaseLogger(),
            logging: true,

            migrationsTableName: "migration",

            migrations: ["dist/**/**/migrations/*.js"],

            cli: {
                migrationsDir: "src/database/migrations",
            },

            ssl: false,
        };
    },
    inject: [ConfigService],
};

export default {
    type: "postgres",

    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    entities: ["dist/**/**/*.entity.js"],

    synchronize: false,
    logger: new DatabaseLogger(),
    logging: true,

    migrationsTableName: "migration",

    migrations: ["dist/**/**/migrations/*.js"],

    cli: {
        migrationsDir: "src/database/migrations",
    },

    ssl: false,
};
