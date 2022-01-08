import { Router, Request, Response } from 'express'
import { AuthController } from '../controllers/auth'
import { body } from 'express-validator'
import { requestValidation } from '../middlewares/request-validation'

export class AuthRouter {
  public router: Router
  public controller: AuthController

  private validation = [
    body('email').isEmail().notEmpty(),
    requestValidation,
  ]

  constructor() {
    this.router = Router()
    this.controller = new AuthController()

    this.router.post('/auth', this.validation, async (req: Request, res: Response) =>
      this.controller.store(req, res)
    )
  }
}
