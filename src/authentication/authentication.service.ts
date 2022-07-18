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
            createdUser.password = undefined;
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
            user.password = undefined;
            return user;
        } catch (error: any) {
            // TODO test this feature
            throw new HttpException(
                this.configService.get("internalServerErrorMessage"),
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `auth=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            "JWT_EXPIRATION_TIME",
        )}`;
    }

    public getCookieForLogOut() {
        return "auth=; HttpOnly; Path=/; Max-Age=0";
    }
}
