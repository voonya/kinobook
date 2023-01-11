import { ElasticService } from './elastic.service';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_LINK,
    }),
  ],
  providers: [
    ElasticService,
    // { provide: InterfacesTokens.ELASTIC_SERVICE, useClass: ElasticService },
  ],
  exports: [ElasticService], //InterfacesTokens.ELASTIC_SERVICE
})
export class ElasticServiceModule {}
