import { getRepository, Repository } from 'typeorm'
import { CustomerEntity } from '../entities/customer'

export class ClientService {
  private clientRepository: Repository<CustomerEntity>
  constructor() {
    this.clientRepository = getRepository(CustomerEntity)
  }

  public async index(): Promise<any> {
    return this.clientRepository.find()
  }

  public async findOne(id: number): Promise<any> {
    return this.clientRepository.findOne(id)
  }

  public async create(client: CustomerEntity) {
    return this.clientRepository.save(client)
  }

  public async update(client: CustomerEntity, id: number) {
    const updateResponse = await this.clientRepository.update(id, client)
    // update still doesn't directly return the result of the modified object
    // https://github.com/typeorm/typeorm/issues/2415
    if (updateResponse.affected) {
      return this.clientRepository.findOne(id)
    }
    return
  }

  public async delete(id: number) {
    console.log('delete')
    const deleteResponse = await this.clientRepository.delete(id)
    console.log({ deleteResponse })
    return deleteResponse.affected
  }
}
