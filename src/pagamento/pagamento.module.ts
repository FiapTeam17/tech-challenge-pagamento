import { Module } from "@nestjs/common";
import { PagamentoService } from "./services";
import { pagamentoProviders } from "./pagamento.providers";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoMongoDBRepositoryGateway } from "./gateways/PagamentoMongoDBRepositoryGateway";

@Module({
    imports: [TypeOrmModule.forFeature([PagamentoModule])],
    controllers: [PagamentoService],
    providers: [...pagamentoProviders, PagamentoMongoDBRepositoryGateway]
  })
  export class PagamentoModule {}