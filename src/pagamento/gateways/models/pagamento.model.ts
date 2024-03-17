import { Column, Entity, ObjectIdColumn } from "typeorm";
import { StatusPagamentoEnumMapper } from "../../types";
import { PagamentoDto } from "../../dtos";
import { ObjectId } from "mongodb";

@Entity("Pagamento")
export class PagamentoModel {
    @ObjectIdColumn()
    id?: ObjectId;

    @Column({
        nullable: true
    })
    public codigoPagamento?: string;

    @Column({
        nullable: false
    })
    public identificador?: string;

    @Column({
        nullable: false
    })
    public valor?: number;

    @Column({
        nullable: true,
        length: 10
    })
    public status?: string;

    @Column({
        nullable: true,
        length: 300
    })
    public qrcode?: string;

    @Column({
        nullable: true,
    })
    public dataCriacao?: Date;

    static getInstancia(pagamento: PagamentoDto): PagamentoModel {
        const pagamentoModel = new PagamentoModel();
        pagamentoModel.id = new ObjectId(pagamento.id);
        pagamentoModel.codigoPagamento = pagamento.codigoPagamento;
        pagamentoModel.identificador = pagamento.identificador;
        pagamentoModel.status = StatusPagamentoEnumMapper.enumParaString(pagamento.status);
        pagamentoModel.qrcode = pagamento.qrCode;
        pagamentoModel.dataCriacao = pagamento.dataCriacao;

        return pagamentoModel;
    }

    public getDto(): PagamentoDto {
        return new PagamentoDto(
            this.id.toString(),
            this.identificador,
            this.dataCriacao,
            this.valor,
            StatusPagamentoEnumMapper.stringParaEnum(this.status),
            this.codigoPagamento,
            this.qrcode);
    }
}
