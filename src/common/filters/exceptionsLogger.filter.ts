import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

// @UseFilters(ExceptionsLoggerFilter) to add to controllers

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        console.log("Exception thrown", exception);
        super.catch(exception, host);
    }
}
