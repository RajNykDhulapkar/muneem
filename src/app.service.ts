import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);
    constructor(private readonly configService: ConfigService) {}
    getHello(): object {
        this.logger.log("Health Check");
        return { message: this.configService.get("healthCheckMessage") };
    }
}
