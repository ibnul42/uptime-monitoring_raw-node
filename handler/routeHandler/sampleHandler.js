// module scaffholding
const handler = {}

handler.sampleHandler = (requestProperties, callback) => {
    callback(200, {
        message: 'This is sample request'
    })
}

// export module
module.exports = handler