import { Router, Request, Response } from 'express'
import { CustomerController } from '../controllers/customer'
import { body } from 'express-validator'
import { requestValidation } from '../middlewares/request-validation'

export class CustomerRouter {
  public router: Router
  public controller: CustomerController

  private validation = [
    body('name').isString(),
    body('email').isEmail().notEmpty(),
    requestValidation,
  ]

  constructor() {
    this.router = Router()
    this.controller = new CustomerController()

    this.router.get('/customers', async (req: Request, res: Response) =>
      this.controller.index(req, res)
    )
    this.router.get('/customers/:id', async (req: Request, res: Response) =>
      this.controller.show(req, res)
    )
    this.router.post('/customers', this.validation, async (req: Request, res: Response) =>
      this.controller.store(req, res)
    )
    this.router.put('/customers/:id', this.validation, async (req: Request, res: Response) =>
      this.controller.update(req, res)
    )
    this.router.delete('/customers/:id', async (req: Request, res: Response) =>
      this.controller.destroy(req, res)
    )
  }
}
