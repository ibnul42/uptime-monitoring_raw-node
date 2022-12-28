// dependencies
const { sampleHandler } = require('./handler/routeHandler/sampleHandler')
const { userHandler } = require('./handler/routeHandler/userHandler')

// module scaffholding
const routes = {
    sample: sampleHandler,
    user: userHandler
}



// export module
module.exports = routes