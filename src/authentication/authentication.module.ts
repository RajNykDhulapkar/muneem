import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAsyncConfig } from "src/config/jwt.config";
import { UserModule } from "src/modules/user/user.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtRefreshTokenStrategy } from "./strategies/jwtRefreshToken.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [UserModule, PassportModule, ConfigModule, JwtModule.registerAsync(JwtAsyncConfig)],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
    controllers: [AuthenticationController], // TODO add authentication controller,
})
export class AuthenticationModule {}
