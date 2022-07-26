import { Module } from "@nestjs/common";
import { EmailConfirmationController } from "./emailConfirmation.controller";

@Module({
    controllers: [EmailConfirmationController],
})
export class EmailConfirmationModule {}
