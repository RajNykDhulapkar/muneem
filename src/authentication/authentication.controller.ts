import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";
import User from "src/modules/user/entities/user.entity";
import { UserService } from "../modules/user/user.service";
import { AuthenticationService } from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import JwtAuthenticationGuard from "./guards/jwtAuthentication.guard";
import JwtRefreshTokenAuthenticationGuard from "./guards/jwtRefreshTokenAuthentication.guard";
import { LocalAuthenticationGuard } from "./guards/localAuthentication.guard";
import RequestWithUser from "./interfaces/requestWithUser.interface";

@Controller("authentication")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService,
    ) {}

    @Post("register")
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post("login")
    async login(@Req() request: RequestWithUser) {
        const user = request.user;
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
        const refreshTokenCookie = this.authenticationService.getCookieWithJwtRefreshToken(user.id);
        await this.userService.setCurrentRefreshToken(refreshTokenCookie.token, user.id);
        request.res.setHeader("Set-Cookie", [accessTokenCookie, refreshTokenCookie.cookie]);
        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post("logout")
    @HttpCode(200)
    async logout(@Req() request: RequestWithUser, @Res() response: Response) {
        await this.userService.removeRefreshToken(request.user.id);
        response.setHeader("Set-Cookie", this.authenticationService.getCookieForLogOut());
    }

    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        return user;
    }

    @UseGuards(JwtRefreshTokenAuthenticationGuard)
    @Get("refresh")
    refresh(@Req() request: RequestWithUser) {
        const user = request.user;
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(
            request.user.id,
        );
        request.res.setHeader("Set-Cookie", accessTokenCookie);
        return user;
    }
}
