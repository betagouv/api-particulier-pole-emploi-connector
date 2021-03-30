import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { JobSeekerSituationNotFoundError } from 'src/job-seeker/errors/job-seeker-situation-not-found.error';

@Catch(JobSeekerSituationNotFoundError)
export class JobSeekerSituationNotFoundErrorFilter implements ExceptionFilter {
  public catch(
    exception: JobSeekerSituationNotFoundError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(404).json({
      statusCode: 404,
      message: exception.message,
    });
  }
}
