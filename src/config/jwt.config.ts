import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

export const JwtAsyncConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        return {
            secret: configService.get("JWT_SECRET"),
            signOptions: {
                expiresIn: `${configService.get("JWT_EXPIRATION_TIME")}`,
            },
        };
    },
};
