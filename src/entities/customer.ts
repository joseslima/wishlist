import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { FavoriteProductsEntity } from './favorite-product'

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @OneToMany(type => FavoriteProductsEntity, favorite_product => favorite_product.customer)
  favorite_products?: FavoriteProductsEntity[]
}
