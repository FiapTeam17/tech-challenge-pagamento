import { Module } from "@nestjs/common";
import { PagamentoService } from "./services";
import { pagamentoProviders } from "./pagamento.providers";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoMongoDBRepositoryGateway } from "./gateways/PagamentoMongoDBRepositoryGateway";
import { PagamentoModel } from "./gateways";
import { PagamentoController } from "./controllers";

@Module({
    imports: [TypeOrmModule.forFeature([PagamentoModel])],
    controllers: [PagamentoController],
    providers: [...pagamentoProviders, PagamentoMongoDBRepositoryGateway]
  })
  export class PagamentoModule {}