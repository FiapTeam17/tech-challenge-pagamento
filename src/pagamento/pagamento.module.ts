import { Module } from "@nestjs/common";
import { pagamentoProviders } from "./pagamento.providers";
import { PagamentoController } from "./controllers";
import { DatabaseModule } from "src/config/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [PagamentoController],
    providers: [...pagamentoProviders]
  })
  export class PagamentoModule {}