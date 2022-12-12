// dependencies
const http = require('http')
const { handleReqResponse } = require('./helpers/handleReqRes')

// module scafholding
const app = {}

// configuration
app.config={
    port: 3000
}

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqResponse)
    server.listen(app.config.port, () => {
        console.log(`Server running on port ${app.config.port}`)
    })
}

// handle request response
app.handleReqResponse = handleReqResponse

// start the server
app.createServer()