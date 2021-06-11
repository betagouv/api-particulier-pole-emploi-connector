import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobSeekerSituation } from 'src/job-seeker/entities/job-seeker-situation.entity';
import { Scope, ScopesFilter } from 'src/job-seeker/scopes.filter';

@Injectable()
export class ScopesInterceptor
  implements NestInterceptor<JobSeekerSituation, Partial<JobSeekerSituation>> {
  constructor(private readonly scopesFilter: ScopesFilter) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<JobSeekerSituation> {
    const scopeHeader = context
      .switchToHttp()
      .getRequest<Request>()
      .header('X-Application-Scopes');

    if (!scopeHeader) {
      return next.handle().pipe(() => throwError(new ForbiddenException()));
    }
    const scopes = scopeHeader.split(',');
    return next.handle().pipe(
      map<JobSeekerSituation, JobSeekerSituation>((data) => {
        return this.scopesFilter.filter(scopes as Scope[], data);
      }),
    );
  }
}
