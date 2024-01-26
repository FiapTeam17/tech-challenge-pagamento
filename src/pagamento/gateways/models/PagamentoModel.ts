import { PagamentoDto } from "src/pagamento/dtos";
import { StatusPagamentoEnumMapper } from "src/pagamento/types";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Pagamento")
export class PagamentoModel {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        nullable: true
    })
    public codigoPagamento?: string;

    // @ManyToOne(() => PedidoModel, (pedido) => pedido.pagamentos, { eager: true })
    // pedido?: PedidoModel;

    @Column({
        nullable: false
    })
    public pedido?: number;

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

    static getInstancia(pagamento: PagamentoDto): PagamentoModel {
        const pagamentoEntity = new PagamentoModel();
        pagamentoEntity.id = pagamento.id;
        pagamentoEntity.codigoPagamento = pagamento.codigoPagamento;
        pagamentoEntity.pedido = pagamento.pedidoId;
        pagamentoEntity.status = StatusPagamentoEnumMapper.enumParaString(pagamento.status);
        pagamentoEntity.qrcode = pagamento.qrCode;

        return pagamentoEntity;
    }

    public getDto(): PagamentoDto {
        return new PagamentoDto(this.id, this.pedido, StatusPagamentoEnumMapper.stringParaEnum(this.status), this.codigoPagamento, this.qrcode);
    }
}
