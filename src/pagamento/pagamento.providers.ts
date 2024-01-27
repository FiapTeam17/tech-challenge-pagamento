import { IAtualizarStatusPagamentoUseCase, IConfirmarPagamentoUseCase, ICriarPagamentoUseCase, IDefinirQrCodePagamentoUseCase, IGerarQrCodeMpUseCase } from "./interfaces";
import { AtualizarStatusPagamentoUseCase, ConfirmarPagamentoUseCase } from "./usecases";
import { CriarPagamentoUseCase } from "./usecases/CriarPagamentoUseCase";
import { DefinirQrCodePagamentoUseCase } from "./usecases/DefinirQrCodePagamentoUseCase";
import { GerarQrCodeMpUseCase } from "./usecases/GerarQrCodeMpUseCase";

export const pagamentoProviders = [
    {
        provide: IConfirmarPagamentoUseCase,
        useFactory: () => ConfirmarPagamentoUseCase,
    },
    {
        provide: IAtualizarStatusPagamentoUseCase,
        useFactory: () => AtualizarStatusPagamentoUseCase,
    },
    {
        provide: ICriarPagamentoUseCase,
        useFactory: () => CriarPagamentoUseCase,
    },
    {
        provide: IDefinirQrCodePagamentoUseCase,
        useFactory: () => DefinirQrCodePagamentoUseCase,
    },
    {
        provide: IGerarQrCodeMpUseCase,
        useFactory: () => GerarQrCodeMpUseCase,
    }

];