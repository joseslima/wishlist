import { Request, Response } from 'express'
import { FavoriteProductsEntity } from '../entities/favorite-product'
import { FavoriteProductService } from '../services/favorite-product'
import { ProductService } from '../services/product'
import { RequestWithAuth } from '../types'

import { pickBy } from 'lodash'

export class FavoriteProductController {
  private favoriteProductService: FavoriteProductService
  private productService: ProductService
  private favoriteProductAttributes = ['id', 'productId', 'customerId']

  constructor() {
    this.favoriteProductService = new FavoriteProductService()
    this.productService = new ProductService()
  }

  private errorHandler(res: Response, error: any) {
    if (
      error.message.includes('duplicate key value violates unique constraint')
    ) {
      res.status(400).send({
        status: 400,
        message: 'This product is already a favorite product of this customer',
      })
      return
    }

    if (error.message.includes('Product not found')) {
      res.status(404).send({
        status: 404,
        message: error.message,
      })
      return
    }

    res.status(500).send({ status: 500, message: error.message })
  }

  private onlyAttributes(body: { [key: string]: any }) {
    return pickBy(body, (value: any, key: string) => {
      return this.favoriteProductAttributes.includes(key)
    })
  }

  public async index(req: RequestWithAuth, res: Response) {
    try {
      const { customerId } = req

      const favoriteProducts = await this.favoriteProductService.index(
        customerId
      )

      await Promise.all(
        favoriteProducts.map(async (favoriteProduct) => {
          favoriteProduct.product = await this.productService.findOne(
            favoriteProduct.productId
          )
        })
      )

      res.send(favoriteProducts)
    } catch (error) {
      this.errorHandler(res, error)
    }
  }

  public async store(req: RequestWithAuth, res: Response) {
    try {
      const { body, customerId } = req

      if (body.customerId) {
        if (body.customerId !== customerId) {
          return res
            .status(403)
            .send({ status: 403, message: 'Not authorized!' })
        }
      } else {
        body.customerId = customerId
      }

      const favoriteProductData = this.onlyAttributes(
        req.body
      ) as FavoriteProductsEntity
      
      const newFavoriteProduct = await this.favoriteProductService.create(
        favoriteProductData
      )
      
      res.send(newFavoriteProduct)
    } catch (error: any) {
      this.errorHandler(res, error)
    }
  }

  public async destroy(req: RequestWithAuth, res: Response) {
    try {
      const { customerId } = req

      const id = Number(req.params.id)

      const favoriteProduct = await this.favoriteProductService.findOne(id)

      if (favoriteProduct?.customerId !== customerId) {
        return res
            .status(403)
            .send({ status: 403, message: 'Not authorized!' })
      }

      const deleteClientResponse = await this.favoriteProductService.delete(id)
      res.status(deleteClientResponse ? 200 : 404).send({ success: true })
    } catch (error) {
      this.errorHandler(res, error)
    }
  }
}
