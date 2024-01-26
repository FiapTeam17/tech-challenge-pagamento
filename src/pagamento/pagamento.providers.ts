import { IAtualizarStatusPagamentoUseCase, IConfirmarPagamentoUseCase } from "./interfaces";
import { AtualizarStatusPagamentoUseCase, ConfirmarPagamentoUseCase } from "./usecases";

export const pagamentoProviders = [
    {
        provide: IConfirmarPagamentoUseCase,
        useFactory: () => ConfirmarPagamentoUseCase,
    },
    {
        provide: IAtualizarStatusPagamentoUseCase,
        useFactory: () => AtualizarStatusPagamentoUseCase,
    }
];