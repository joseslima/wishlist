import { getRepository, Repository } from 'typeorm'
import { FavoriteProductsEntity } from '../entities/favorite-product'
import { ProductService } from './product'

export class FavoriteProductService {
  private favoriteProductRepository: Repository<FavoriteProductsEntity>
  private productService: ProductService

  constructor() {
    this.favoriteProductRepository = getRepository(FavoriteProductsEntity)
    this.productService = new ProductService()
  }

  public async index(
    customerId?: string | string[] | any
  ): Promise<FavoriteProductsEntity[]> {
    let where = {}

    if (customerId) {
      where = { customerId: customerId }
    }

    return this.favoriteProductRepository.find({ where })
  }

  public async findOne(
    id: number
  ): Promise<FavoriteProductsEntity | undefined> {
    return this.favoriteProductRepository.findOne(id)
  }

  public async create(
    favoriteProduct: FavoriteProductsEntity
  ): Promise<FavoriteProductsEntity> {
    const { productId } = favoriteProduct

    const product = await this.productService.findOne(productId || '')

    if (!product) {
      throw new Error('Product not found!')
    }

    return this.favoriteProductRepository.save(favoriteProduct)
  }

  public async delete(id: number): Promise<number | null | undefined> {
    const deleteResponse = await this.favoriteProductRepository.delete(id)
    return deleteResponse.affected
  }
}
