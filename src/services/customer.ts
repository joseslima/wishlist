import { getRepository, Repository } from 'typeorm'
import { CustomerEntity } from '../entities/customer'
import { pickBy, identity } from 'lodash'

interface CustomerFindOnePayload {
  id?: number
  email?: string
}
export class CustomerService {
  private customerRepository: Repository<CustomerEntity>
  constructor() {
    this.customerRepository = getRepository(CustomerEntity)
  }

  public async index(customerId?: number): Promise<CustomerEntity[]> {
    let where = {}

    if (customerId) {
      where = { customerId: customerId }
    }

    return this.customerRepository.find({ where })
  }

  public async findOne(
    payload: CustomerFindOnePayload
  ): Promise<CustomerEntity | undefined> {
    return this.customerRepository.findOne({ where: pickBy(payload, identity) })
  }

  public async create(client: CustomerEntity): Promise<CustomerEntity> {
    return this.customerRepository.save(client)
  }

  public async update(
    client: CustomerEntity,
    id: number
  ): Promise<CustomerEntity | undefined> {
    const updateResponse = await this.customerRepository.update(id, client)
    // update still doesn't directly return the result of the modified object
    // https://github.com/typeorm/typeorm/issues/2415
    if (updateResponse.affected) {
      return this.customerRepository.findOne(id)
    }
    return
  }

  public async delete(id: number): Promise<number | undefined | null> {
    const deleteResponse = await this.customerRepository.delete(id)
    return deleteResponse.affected
  }
}
