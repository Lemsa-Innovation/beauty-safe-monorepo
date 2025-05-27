import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [String] })
  @Column("text", { array: true })
  eans: string[];

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  brand: string;

  @ApiProperty()
  @Column({ type: 'float', default: 0 })
  score: number;

  @ApiProperty()
  @Column({ default: 0 })
  validation_score: number;

@ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  @Column({ type: 'jsonb', nullable: true })
  categories: any;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  @Column({ type: 'jsonb', nullable: true })
  compositions: any;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  @Column({ type: 'jsonb', nullable: true })
  images: any;
}
