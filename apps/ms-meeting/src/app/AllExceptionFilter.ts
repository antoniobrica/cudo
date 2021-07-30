import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  // catch(exception: unknown, host: ArgumentsHost) {
    // super.catch(exception, host);
  // }
  public catch(exception: any, host: ArgumentsHost): any {
      // console.log('--AllExceptionsFilter--exception---', exception)
      // const detail = exception.detail;
    // if (typeof detail === 'string' && detail.includes('already exists')) {
    //   const messageStart = exception.table.split('_').join(' ') + ' with';
    //   throw new BadRequestException(
    //     exception.detail.replace('Key', messageStart),
    //   );
    // }
    return super.catch(exception, host);
  }
}