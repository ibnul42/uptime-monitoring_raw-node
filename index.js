// dependencies
const http = require('http')
const { handleReqResponse } = require('./helpers/handleReqRes')
const environment = require('./helpers/environments')
const data = require('./lib/data')

// module scafholding
const app = {}

// data testing
// create
/*
data.create('testing', 'newFile', {name: 'newFile'}, (err) => {
    console.log(err)
})
*/

// read
/*
data.read('testing', 'newFile', (err, data) => {
    console.log(err, data)
})
*/

// update
/*
data.update('testing', 'newFile', {name: 'Bangladesh', language: "BN"}, (err) => {
    console.log(err)
})
*/

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