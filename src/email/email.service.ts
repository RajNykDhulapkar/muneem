import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, SendMailOptions } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { ConfigProps } from "../config/validationSchema";

@Injectable()
export class EmailService {
    private nodemailerTransporter: Mail;

    private readonly logger = new Logger(EmailService.name);

    constructor(private readonly configService: ConfigService<ConfigProps>) {
        this.nodemailerTransporter = createTransport({
            host: configService.get<string>("EMAIL_HOST"),
            port: configService.get<number>("EMAIL_PORT"),
            secure: configService.get<boolean>("EMAIL_SECURE"),
            auth: {
                user: configService.get<string>("EMAIL_USER"),
                pass: configService.get<string>("EMAIL_PASSWORD"),
            },
        });
    }

    public sendMail(payload: SendMailOptions) {
        return this.nodemailerTransporter.sendMail(payload, (err, info) => {
            if (err) {
                this.logger.error(err, "Error Sending email", undefined, EmailService.name);
                return;
            }
            this.logger.log(`Preview url: ${info}`);
        });
    }
}
