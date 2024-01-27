import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoModule } from './pagamento/pagamento.module';
import { ConfigModule } from '@nestjs/config';

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@pagamentodb.ywhqiew.mongodb.net/?retryWrites=true&w=majority`;


@Module({
  imports: [
    ConfigModule, 
    PagamentoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor () {}
}