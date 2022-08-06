import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import User from "../../modules/user/entities/user.entity";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger("HTTP");
    use(req: Request, res: Response, next: NextFunction) {
        // log the request body // for debugging only
        this.logger.log(req.body); // TODO remove
        res.on("finish", () => {
            const { method, originalUrl } = req;
            const { statusCode, statusMessage } = res;
            const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${
                req.user ? "<user: " + (req.user as User).email + ">" : ""
            }`;

            if (statusCode >= 500) {
                return this.logger.error(message, undefined, "HTTP");
            }

            if (statusCode >= 400) {
                return this.logger.warn(message);
            }

            return this.logger.log(message);
        });
        next();
    }
}
