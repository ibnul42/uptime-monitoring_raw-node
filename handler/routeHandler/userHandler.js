const handlers = require("../../helpers/handleReqRes")
const data = require('../../lib/data')
const { hash } = require('../../helpers/utilities')

// module scaffholding
const handler = {}

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete']
    if(acceptedMethods.indexOf(requestProperties.method) > -1){
     handler._users[requestProperties.method](requestProperties, callback) 
    } else {
        callback(405)
    }
}

handler._users = {}

handler._users.get = (requestProperties, callback) => {
    callback(200)
}

handler._users.post = (requestProperties, callback) => {
    const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false

    const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false

    const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false

    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false

    const tosAgreement = typeof(requestProperties.body.tosAgreement) === 'boolean' ? requestProperties.body.tosAgreement : false

    console.log(firstName, lastName, phone, password, tosAgreement)

    if(firstName && lastName && phone && password && tosAgreement) {
        // make sure user doesn't exist
        data.read('users', phone, (err, user) => {
            if(err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                }
                data.create('users', phone, userObject, (err) => {
                    // store user to db
                    if(!err){
                        callback(200, {
                            message: 'Successfully created user!'
                        })
                    } else {
                        callback(500, {
                            error: 'Could not create user'
                        })
                    }
                })
            } else {
                callback(500, {
                    error: 'There was an error on server side!'
                })
            }
        })
    } else {
        callback(500, {
            error: 'Invalid request'
        })
    }

}

handler._users.put = (requestProperties, callback) => {
    callback(200)
}

handler._users.delete = (requestProperties, callback) => {
    callback(200)
}

// export module
module.exports = handler