import { Module } from "@nestjs/common";
import { PagamentoService } from "./services";
import { pagamentoProviders } from "./pagamento.providers";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoMongoDBRepositoryGateway } from "./gateways/PagamentoMongoDBRepositoryGateway";
import { PagamentoModel } from "./gateways";
import { PagamentoController } from "./controllers";
import { DatabaseModule } from "src/config/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [PagamentoController],
    providers: [...pagamentoProviders]
  })
  export class PagamentoModule {}