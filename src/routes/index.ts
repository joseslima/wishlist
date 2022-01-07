import { Router, json } from 'express'

import { CustomerRouter } from './customer'

const router = Router()

router.use(json())
router.use(new CustomerRouter().router)

export { router as AppRouter }
