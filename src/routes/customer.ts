import { Router, Request, Response } from 'express'
import { CustomerController } from '../controllers/customer'
import { body } from 'express-validator'
import { requestValidation } from '../middlewares/request-validation'
import { checkJWT } from '../middlewares/auth'

export class CustomerRouter {
  public router: Router
  public controller: CustomerController

  private storeValidation = [
    body('name').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    requestValidation,
  ]

  private updateValidation = [
    body('name').isString().optional(),
    body('email').isEmail().optional(),
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
    this.router.post(
      '/customers',
      this.storeValidation,
      async (req: Request, res: Response) => this.controller.store(req, res)
    )
    this.router.put(
      '/customers/:id',
      checkJWT,
      this.updateValidation,
      async (req: Request, res: Response) => this.controller.update(req, res)
    )
    this.router.delete(
      '/customers/:id',
      checkJWT,
      async (req: Request, res: Response) => this.controller.destroy(req, res)
    )
  }
}
