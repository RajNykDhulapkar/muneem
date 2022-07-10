import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);
    getHello(): object {
        this.logger.log("Health Check");
        return { message: "OK" };
    }
}
