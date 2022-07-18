import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthenticationService } from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import JwtAuthenticationGuard from "./guards/jwtAuthentication.guard";
import { LocalAuthenticationGuard } from "./guards/localAuthentication.guard";
import RequestWithUser from "./interfaces/requestWithUser.interface";

@Controller("authentication")
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post("register")
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post("login")
    async login(@Req() request: RequestWithUser, @Res() response: Response) {
        const user = request.user;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader("Set-Cookie", cookie);
        user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post("logout")
    async logout(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader("Set-Cookie", this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}
