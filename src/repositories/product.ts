import { ProductEntity } from '../entities/product'
import { AxiosInstance } from 'axios'
import Axios from 'axios'

export class ProductRepository {
  private client: AxiosInstance

  constructor() {
    this.client = Axios.create({
      timeout: 120000,
      baseURL: 'http://challenge-api.luizalabs.com/api/product',
    })
  }

  public async findOne(id: string): Promise<ProductEntity | undefined> {
    try {
      const response = await this.client.get(`${id}/`) 
      return response.data as ProductEntity
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.log({ error })
      }
      return
    }
  }
}
