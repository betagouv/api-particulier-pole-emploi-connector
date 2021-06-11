import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
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
    const scopes = context
      .switchToHttp()
      .getRequest<Request>()
      .header('X-Application-Scopes')
      .split(',');
    return next.handle().pipe(
      map<JobSeekerSituation, JobSeekerSituation>((data) => {
        return this.scopesFilter.filter(scopes as Scope[], data);
      }),
    );
  }
}
