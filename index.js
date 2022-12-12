// dependencies
const http = require('http')
const { handleReqResponse } = require('./helpers/handleReqRes')
const environment = require('./helpers/environments')

// module scafholding
const app = {}

// configuration
app.config={
    port: 3000
}

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqResponse)
    server.listen(environment.port, () => {
        console.log(`Server running on port ${environment.port}`)
    })
}

// handle request response
app.handleReqResponse = handleReqResponse

// start the server
app.createServer()