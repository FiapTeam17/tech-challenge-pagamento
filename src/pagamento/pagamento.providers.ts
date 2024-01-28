import {
    IConfirmarPagamentoUseCase,
    ICriarPagamentoUseCase,
    IDefinirQrCodePagamentoUseCase,
    IGerarQrCodeMpUseCase
} from "./interfaces";
import {
    ConfirmarPagamentoUseCase,
    CriarPagamentoUseCase,
    DefinirQrCodePagamentoUseCase,
    GerarQrCodeMpUseCase
} from "./usecases";

export const pagamentoProviders = [
    // {
    //     provide: IConfirmarPagamentoUseCase,
    //     useClass: ConfirmarPagamentoUseCase,
    // },
    // {
    //     provide: ICriarPagamentoUseCase,
    //     useClass: CriarPagamentoUseCase,
    // },
    // {
    //     provide: IDefinirQrCodePagamentoUseCase,
    //     useClass: DefinirQrCodePagamentoUseCase,
    // },
    // {
    //     provide: IGerarQrCodeMpUseCase,
    //     useClass: GerarQrCodeMpUseCase,
    // }
];