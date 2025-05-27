import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ type: [String] })
  eans: string[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  validation_score: number;

  @ApiProperty()
  score: number;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  categories?: any;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  compositions?: any;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  images?: any;
}
