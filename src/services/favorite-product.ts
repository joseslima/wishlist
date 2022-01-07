import { getRepository, Repository } from 'typeorm'
import { FavoriteProductsEntity } from '../entities/favorite-product'

export class FavoriteProductService {
  private favoriteProductRepository: Repository<FavoriteProductsEntity>
  constructor() {
    this.favoriteProductRepository = getRepository(FavoriteProductsEntity)
  }

  public async index(): Promise<any> {
    return this.favoriteProductRepository.find()
  }

  public async findOne(id: number): Promise<any> {
    return this.favoriteProductRepository.findOne(id)
  }

  public async create(client: FavoriteProductsEntity) {
    return this.favoriteProductRepository.save(client)
  }

  public async update(client: FavoriteProductsEntity, id: number) {
    const updateResponse = await this.favoriteProductRepository.update(id, client)
    // update still doesn't directly return the result of the modified object
    // https://github.com/typeorm/typeorm/issues/2415
    if (updateResponse.affected) {
      return this.favoriteProductRepository.findOne(id)
    }
    return
  }

  public async delete(id: number) {
    const deleteResponse = await this.favoriteProductRepository.delete(id)
    return deleteResponse.affected
  }
}
