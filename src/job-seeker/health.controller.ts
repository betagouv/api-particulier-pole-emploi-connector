import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('ping')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiExcludeEndpoint()
  check() {
    return this.healthCheckService.check([
      () =>
        this.http.responseCheck(
          'airtable-api',
          `${process.env.AIRTABLE_API_URL}/Individus`,
          (response) => {
            return response.status === 200;
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
            },
          },
        ),
    ]);
  }
}
