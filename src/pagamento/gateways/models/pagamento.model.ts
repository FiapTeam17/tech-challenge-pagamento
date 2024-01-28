import { Column, Entity, ObjectIdColumn } from "typeorm";
import { StatusPagamentoEnumMapper } from "../../types";
import { PagamentoDto } from "../../dtos";

@Entity("Pagamento")
export class PagamentoModel {
    @ObjectIdColumn()
    id?: number;
    
    @Column({
        nullable: true
    })
    public codigoPagamento?: string;
    
    @Column({
        nullable: false
    })
    public identificacao?: number;
    
    @Column({
        nullable: true
    })
    public urlCallback?: string;
    
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
        pagamentoEntity.identificacao = pagamento.identificador;
        pagamentoEntity.urlCallback = pagamento.urlCallback;
        pagamentoEntity.status = StatusPagamentoEnumMapper.enumParaString(pagamento.status);
        pagamentoEntity.qrcode = pagamento.qrCode;
        
        return pagamentoEntity;
    }
    
    public getDto(): PagamentoDto {
        return new PagamentoDto(
            this.id,
            this.identificacao,
            StatusPagamentoEnumMapper.stringParaEnum(this.status),
            this.urlCallback,
            this.codigoPagamento,
            this.qrcode);
    }
}
