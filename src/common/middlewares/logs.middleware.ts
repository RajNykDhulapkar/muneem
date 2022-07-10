import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction, response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger("HTTP");
    use(req: Request, res: Response, next: NextFunction) {
        res.on("finish", () => {
            const { method, originalUrl } = req;
            const { statusCode, statusMessage } = res;
            const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

            if (statusCode >= 500) {
                return this.logger.error(message);
            }

            if (statusCode >= 400) {
                return this.logger.warn(message);
            }

            return this.logger.log(message);
        });
        next();
    }
}
