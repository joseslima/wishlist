import { Request, Response } from 'express'
import { CustomerService } from '../services/customer'
import jwt from 'jsonwebtoken'

export class AuthController {
  private customerService: CustomerService

  constructor() {
    this.customerService = new CustomerService()
  }

  private errorHandler(res: Response, error: any) {
    res.status(500).send({ status: 500, message: error.message })
  }

  public async store(req: Request, res: Response) {
    try {
      const customer = await this.customerService.findOne({ email: req.body.email })
      
      if (customer) {
        const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET_KEY || 'secret', { expiresIn: 600 })
        return res.status(200).send({ token })
      }

      return res.status(404).send({ status: 404, message: "Customer not found!"})
    } catch (error: any) {
      this.errorHandler(res, error)
    }
  }
}
