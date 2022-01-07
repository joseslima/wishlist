import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm'
import { CustomerEntity } from './customer'
import { ProductEntity } from './product'

@Entity('favoriteProducts')
@Unique(['customerId', 'productId'])
export class FavoriteProductsEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('uuid')
  productId?: string

  product?: ProductEntity
  
  @Column()
  customerId?: number

  @ManyToOne((type) => CustomerEntity, (customer) => customer.favorite_products)
  customer?: CustomerEntity
}
