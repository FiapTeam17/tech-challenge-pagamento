import { Module } from "@nestjs/common";
import { pagamentoProviders } from "./pagamento.providers";
import { PagamentoController } from "./controllers";
import { DatabaseModule } from "../config/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [PagamentoController],
    providers: [...pagamentoProviders]
  })
  export class PagamentoModule {}