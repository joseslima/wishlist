import { Router, json } from 'express'
import { CustomerRouter } from './customer'
import { FavoriteProductRouter } from './favorite-product'
import { AuthRouter } from './auth'

const router = Router()

router.use(json())
router.use(new CustomerRouter().router)
router.use(new FavoriteProductRouter().router)
router.use(new AuthRouter().router)

export { router as AppRouter }
