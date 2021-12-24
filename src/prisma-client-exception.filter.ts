import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.CONFLICT;
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002':
      case 'P2018':
      case 'P2025':
        console.log(message);
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
