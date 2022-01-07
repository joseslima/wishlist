import {ProductRepository} from '../repositories/product'
import { ProductEntity } from '../entities/product'

export class ProductService {
  private productRepository: ProductRepository
  constructor() {
    this.productRepository = new ProductRepository()
  }

  public async findOne(id: string): Promise<ProductEntity | undefined> {
    return this.productRepository.findOne(id)
  }
}
