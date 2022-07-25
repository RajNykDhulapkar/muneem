import { UserService } from "src/modules/user/user.service";
import * as bcrypt from "bcrypt";
import RegisterDto from "./dto/register.dto";
import { User } from "src/modules/user/entities/user.entity";
import PostgresErrorCode from "src/database/postgresErrorCodes.enum";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import TokenPayload from "./interfaces/tokenPayload.interface";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    public async register(registerInput: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerInput.password, 10);
        try {
            const createdUser = await this.userService.create({
                ...registerInput,
                password: hashedPassword,
            });
            return createdUser;
        } catch (error: any) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    "User with that email already exists",
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(
                this.configService.get("internalServerErrorMessage"),
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async getAuthenticatedUser(email: string, password: string) {
        try {
            const user = await this.userService.getByEmail(email);
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            if (!isPasswordMatching) {
                throw new HttpException("Wrong credentials provided", HttpStatus.UNAUTHORIZED);
            }
            return user;
        } catch (error: any) {
            // TODO test this feature
            throw new HttpException(
                this.configService.get("internalServerErrorMessage"),
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public getCookieWithJwtAccessToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: `${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`,
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            "JWT_ACCESS_TOKEN_EXPIRATION_TIME",
        )}`;
    }
    public getCookieWithJwtRefreshToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: `${this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME")}s`,
        });
        // TODO change Path parameter to confirm sending of refresh token only when it is needed
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            "JWT_REFRESH_TOKEN_EXPIRATION_TIME",
        )}`;
        return {
            cookie,
            token,
        };
    }

    public getCookieForLogOut() {
        return [
            "Authentication=; HttpOnly; Path=/; Max-Age=0",
            "Refresh=; HttpOnly; Path=/; Max-Age=0",
        ];
    }
}
