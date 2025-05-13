import { ApiProperty } from '@nestjs/swagger';

export class InvoiceItemDetail {
  @ApiProperty()
  readonly sku: string;
  @ApiProperty()
  readonly qt: number;
}
export class CreateInvoiceDto {
  @ApiProperty()
  readonly customer: string;
  @ApiProperty()
  readonly amount: number;
  @ApiProperty()
  readonly reference: string;
  @ApiProperty()
  readonly date: Date;
  @ApiProperty({
    type: [InvoiceItemDetail],
  })
  readonly items: InvoiceItemDetail[];
}
