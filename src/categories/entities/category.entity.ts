import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../BaseEntity';
import { ServicesQuotes } from '../../servicesquotes/entities/servicesquotes.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'boolean',
  })
  status: boolean;

  @OneToMany(() => ServicesQuotes, (services) => services.category)
  services: ServicesQuotes[];
}
