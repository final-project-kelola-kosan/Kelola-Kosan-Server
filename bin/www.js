const http = require('http')
const app = require('../app')
const port = process.env.PORT || 3000

http
  .createServer(app)
  .listen(port, _=> console.log(`Kelola-Kosan running on http://localhost:${port}`))