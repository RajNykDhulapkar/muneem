import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateUserDto from "./dto/createUser.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

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

    create(createUserInput: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserInput);
        return this.userRepository.save(newUser);
    }
}
