// module scaffholding
const handler = {}

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Sorry your requested page does not exist'
    })
}

// export module
module.exports = handler