const crypto = require('crypto')
const environments = require('./environments')

// module scaffholding
const utilities = {}

// parse body from request
utilities.parseJson = (string) => {
    let body
    try {
        body = JSON.parse(string)
    } catch (err) {
        body = {}
    }
    return body
}

// hash string
utilities.hash = (string) => {
    if(typeof string === 'string' && string.length > 0) {
        const hash = crypto
            .createHmac('sha256', environments.secretKey)
            .update(string)
            .digest('hex')
        return hash
    } else {
        return false
    }
}

// export module
module.exports = utilities