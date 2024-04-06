import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../BaseEntity';
import { ServicesQuotes } from '../../servicesquotes/entities/servicesquotes.entity';

@Entity()
export class Quote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'timestamptz',
  })
  date: Date;

  @Column({
    type: 'varchar',
    length: 255,
  })
  clientName: string;

  @ManyToOne(() => ServicesQuotes, (service) => service.quotes)
  service: ServicesQuotes;
}
