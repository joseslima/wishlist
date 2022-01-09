import { Router, Request, Response } from 'express'
import { FavoriteProductController } from '../controllers/favorite-product'
import { body } from 'express-validator'
import { requestValidation } from '../middlewares/request-validation'
import {checkJWT} from '../middlewares/auth'

export class FavoriteProductRouter {
  public router: Router
  public controller: FavoriteProductController

  private validation = [
    body('productId').isUUID().notEmpty(),
    body('customerId').isInt().optional(),
    requestValidation,
  ]

  constructor() {
    this.router = Router()
    this.controller = new FavoriteProductController()

    this.router.get('/favorite-products', checkJWT, async (req: Request, res: Response) =>
      this.controller.index(req, res)
    )
    this.router.post('/favorite-products', checkJWT, this.validation, async (req: Request, res: Response) =>
      this.controller.store(req, res)
    )
    this.router.delete('/favorite-products/:id', checkJWT,  async (req: Request, res: Response) =>
      this.controller.destroy(req, res)
    )
  }
}
