import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { faker } from "@faker-js/faker";

describe("UserController", () => {
    let controller: UserController;

    const mockUserService = {
        create: jest.fn((dto) => ({
            id: faker.datatype.uuid(),
            ...dto,
        })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(mockUserService)
            .compile();

        controller = module.get<UserController>(UserController);
    });

    describe("createUser", () => {
        it.todo("should create a user");
    });

    describe("findAllUser", () => {
        it.todo("should find all user with give filter options");
    });

    describe("findUser", () => {
        it.todo("should find user with the given id");
    });

    describe("deleteUser", () => {
        it.todo("should delete user with the given id");
    });
});
