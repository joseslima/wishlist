import { Request, Response } from 'express'
import { CustomerEntity } from '../entities/customer'
import { CustomerService } from '../services/customer'
import { RequestWithAuth } from '../types'
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
      const customers = await this.clientService.index()
      res.send(customers)
    } catch (error) {
      this.errorHandler(res, error)
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const client = await this.clientService.findOne({ id })
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

  public async update(req: RequestWithAuth, res: Response) {
    try {
      const clientData = this.onlyAttributes(req.body) as CustomerEntity
      const id = Number(req.params.id)

      const updatedClient = await this.clientService.update(clientData, id)

      const { customerId } = req

      if (customerId !== id) {
        return res.status(403).send({ status: 403, message: 'Not authorized!' })
      }

      res.status(updatedClient ? 200 : 404).send(updatedClient)
    } catch (error) {
      this.errorHandler(res, error)
    }
  }

  public async destroy(req: RequestWithAuth, res: Response) {
    try {
      const id = Number(req.params.id)

      const { customerId } = req

      if (customerId !== id) {
        return res.status(403).send({ status: 403, message: 'Not authorized!' })
      }

      const deleteClientResponse = await this.clientService.delete(id)
      res.status(deleteClientResponse ? 200 : 404).send({ success: true })
    } catch (error) {
      this.errorHandler(res, error)
    }
  }
}
