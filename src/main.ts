import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import CustomLogger from "./common/log/customLogger";
import getLogLevels from "./common/utils/getLogLevels";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: getLogLevels(process.env.NODE_ENV === "production"),
        bufferLogs: true,
    });
    app.enableCors({
        origin: "http://localhost:3000",
    });
    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.use(cookieParser());
    app.useLogger(app.get(CustomLogger));
    const configService: ConfigService = app.get(ConfigService);
    await app.listen(configService.get<number>("PORT"));
}
bootstrap();
