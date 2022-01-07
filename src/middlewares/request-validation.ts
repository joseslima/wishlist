import { validationResult } from 'express-validator'

const requestValidation = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(400).json({
      code: '400',
      message: `Validation failed. ${errors
        .array()
        .map(({ msg, param }) => `${param}: ${msg}`)
        .join(', ')}`,
      errors: errors.array(),
    })
  next()
}

export { requestValidation }
