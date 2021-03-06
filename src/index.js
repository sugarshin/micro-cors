const DEFAULT_ALLOW_METHODS = [
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS'
]

const DEFAULT_ALLOW_HEADERS = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept'
]

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 // 24 hours

const cors = options => handler => (req, res, ...restArgs) => {
  const {
    origin = '*',
    maxAge = DEFAULT_MAX_AGE_SECONDS,
    allowMethods = DEFAULT_ALLOW_METHODS,
    allowHeaders = DEFAULT_ALLOW_HEADERS,
    exposeHeaders = []
  } = (options || {})

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', String(maxAge))
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', allowMethods.join(','))
  res.setHeader('Access-Control-Allow-Headers', allowHeaders.join(','))

  if (exposeHeaders.length) {
    res.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(','))
  }

  return handler(req, res, ...restArgs)
}

module.exports = cors
