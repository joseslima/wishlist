import jwt from 'jsonwebtoken'

const checkJWT = function (req, res, next) {  
  const token = req.headers['authorization'] as string

  if (!token)
    return res.status(403).json({ status: 403, message: 'Not authorized!' })

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || 'secret',
    (err, decoded: any) => {
      if (err) {
        if (err.message === 'jwt expired') {
          return res.status(403).json({ status: 403, message: 'Token expired' })
        }
        return res.status(403).json({ status: 403, message: 'Not authorized!' })
      }

      req.customerId = decoded.id

      next()
    }
  )
}

export { checkJWT }
