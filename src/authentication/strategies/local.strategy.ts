import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthenticationService } from "../authentication.service";
import { User } from "../../modules/user/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authenticationService: AuthenticationService) {
        super({
            usernameField: "email",
        });
    }

    async validate(email: string, passport: string) {
        return this.authenticationService.getAuthenticatedUser(email, passport);
    }
}
