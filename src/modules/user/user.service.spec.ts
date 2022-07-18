import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [Repository<User>],
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
