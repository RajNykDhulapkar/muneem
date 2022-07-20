import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import CreateUserInput from "./interfaces/createUser.interface";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException("User with this email does not exist", HttpStatus.NOT_FOUND);
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ email });
        if (user) {
            return user;
        }
        throw new HttpException("User with this email does not exist", HttpStatus.NOT_FOUND);
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<User | null> {
        const user = await this.getById(userId);
        if (user.currentHashedRefreshToken) {
            const isRefreshTokenMatching = await bcrypt.compare(
                refreshToken,
                user.currentHashedRefreshToken,
            );
            if (isRefreshTokenMatching) {
                return user;
            }
        }
    }

    create(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.userRepository.create(createUserInput);
        return this.userRepository.save(newUser);
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(userId, {
            currentHashedRefreshToken,
        });
    }

    async removeRefreshToken(userId: number) {
        return this.userRepository.update(userId, {
            currentHashedRefreshToken: null,
        });
    }
}
