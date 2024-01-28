import {Column, Entity, ObjectIdColumn} from "typeorm";
import {StatusPagamentoEnumMapper} from "../../types";
import {PagamentoDto} from "../../dtos";
import {ObjectId} from "mongodb";

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
        const pagamentoModel = new PagamentoModel();
        pagamentoModel.id = new ObjectId(pagamento.id);
        pagamentoModel.codigoPagamento = pagamento.codigoPagamento;
        pagamentoModel.identificador = pagamento.identificador;
        pagamentoModel.urlCallback = pagamento.urlCallback;
        pagamentoModel.status = StatusPagamentoEnumMapper.enumParaString(pagamento.status);
        pagamentoModel.qrcode = pagamento.qrCode;
        
        return pagamentoModel;
    }
    
    public getDto(): PagamentoDto {
        return new PagamentoDto(
            this.id.toString(),
            this.identificador,
            StatusPagamentoEnumMapper.stringParaEnum(this.status),
            this.urlCallback,
            this.codigoPagamento,
            this.qrcode);
    }
}
