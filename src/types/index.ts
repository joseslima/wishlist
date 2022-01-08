import { Request } from 'express'

export interface RequestWithAuth extends Request{
	customerId?: number
}
