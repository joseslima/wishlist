import { Request, Response } from 'express'
import { CustomerEntity } from '../entities/customer'
import { CustomerService } from '../services/customer'
import { pickBy } from 'lodash'

export class CustomerController {
  private clientService: CustomerService
  private clientAttributes = ['id', 'name', 'email']

  constructor() {
    this.clientService = new CustomerService()
  }

  private errorHandler(res: Response, error: any) {
    if (
      error.message.includes('duplicate key value violates unique constraint')
    ) {
      res.status(400).send({
        status: 400,
        message: 'There is already a customer with this email',
      })
    }

    res.status(500).send({ status: 500, message: error.message })
  }

  private onlyAttributes(body: { [key: string]: any }) {
    return pickBy(body, (value: any, key: string) => {
      return this.clientAttributes.includes(key)
    })
  }

  public async index(req: Request, res: Response) {
    try {
      const clients = await this.clientService.index()
      res.send(clients)
    } catch (error) {
      this.errorHandler(res, error)
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const client = await this.clientService.findOne(id)
      res.status(client ? 200 : 404).send(client)
    } catch (error) {
      this.errorHandler(res, error)
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const clientData = this.onlyAttributes(req.body) as CustomerEntity
      const newClient = await this.clientService.create(clientData)
      res.send(newClient)
    } catch (error: any) {
      this.errorHandler(res, error)
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const clientData = this.onlyAttributes(req.body) as CustomerEntity
      const id = Number(req.params.id)
      const updatedClient = await this.clientService.update(clientData, id)
      res.status(updatedClient ? 200 : 404).send(updatedClient)
    } catch (error) {
      this.errorHandler(res, error)
    }
  }

  public async destroy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const deleteClientResponse = await this.clientService.delete(id)
      res.status(deleteClientResponse ? 200 : 404).send({ success: true })
    } catch (error) {
      this.errorHandler(res, error)
    }
  }
}
