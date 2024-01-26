import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PagamentoModule } from './pagamento/pagamento.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
    PagamentoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor (private dataSource: DataSource) {}
}