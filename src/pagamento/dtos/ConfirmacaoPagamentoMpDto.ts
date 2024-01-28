import { ApiProperty } from "@nestjs/swagger";

export class ConfirmacaoPagamentoMpDto {

    @ApiProperty({
        example: "test.created"
    })
    action: string;

    @ApiProperty({
        example: "v1"
    })
    api_version: string;

    @ApiProperty({
        example: "8375344102018334"
    })
    application_id: string;

    @ApiProperty({
        example: "2021-01-01 02:02:02 +0000 UTC"
    })
    date_created: string;

    @ApiProperty({
        example: "123456"
    })
    id: string;

    @ApiProperty({
        example: "false"
    })
    live_mode: string;

    @ApiProperty({
        example: "test"
    })
    type: string;

    @ApiProperty({
        example: "29575195"
    })
    user_id: number;

    data: Data;
}

export class Data {
    @ApiProperty({
        example: "123456789"
    })
    id: string;
}
