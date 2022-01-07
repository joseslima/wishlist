import { Router, json } from 'express'

import { CustomerRouter } from './customer'
import { FavoriteProductRouter } from './favorite-product'


const router = Router()

router.use(json())
router.use(new CustomerRouter().router)
router.use(new FavoriteProductRouter().router)


export { router as AppRouter }
