import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Module } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { InterfacesTokens } from '@infrastructure/common';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  providers: [
    ElasticService,
    { provide: InterfacesTokens.ELASTIC_SERVICE, useClass: ElasticService },
  ],
  exports: [ElasticService, InterfacesTokens.ELASTIC_SERVICE],
})
export class ElasticServiceModule {}
