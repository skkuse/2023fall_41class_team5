import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { InformationService } from './information.service';

@Module({
  providers: [InformationService],
})
export class InformationModule implements OnApplicationBootstrap {
  constructor(private readonly informationService: InformationService) {}

  async onApplicationBootstrap() {
    await this.informationService.setLocalServerInformation();
  }
}
