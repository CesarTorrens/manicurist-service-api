import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../BaseEntity';
import { Category } from '../../categories/entities/category.entity';
import { Quote } from '../../quotes/entities/quote.entity';

@Entity()
export class ServicesQuotes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'boolean',
  })
  status: boolean;

  @ManyToOne(() => Category, (category) => category.services)
  category: Category;

  @OneToMany(() => Quote, (quote) => quote.service)
  quotes: Quote[];
}
