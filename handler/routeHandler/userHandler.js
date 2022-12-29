const handlers = require("../../helpers/handleReqRes")
const data = require("../../lib/data")
const { hash, parseJson } = require("../../helpers/utilities")

// module scaffholding
const handler = {}

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"]
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback)
  } else {
    callback(405)
  }
}

handler._users = {}

handler._users.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStrings.phone === "string" &&
    requestProperties.queryStrings.phone.trim().length === 11
      ? requestProperties.queryStrings.phone
      : false
  if (phone) {
    data.read("users", phone, (err, data) => {
      if (!err && data) {
        const user = { ...parseJson(data) }
        delete user.password
        callback(200, user)
      } else {
        callback(404, {
          error: "Requested user not found",
        })
      }
    })
  } else {
    callback(404, {
      error: "Requested user not found",
    })
  }
}

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean"
      ? requestProperties.body.tosAgreement
      : false

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure user doesn't exist
    data.read("users", phone, (err, user) => {
      if (err) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        }
        data.create("users", phone, userObject, (err) => {
          // store user to db
          if (!err) {
            callback(200, {
              message: "Successfully created user!",
            })
          } else {
            callback(500, {
              error: "Could not create user",
            })
          }
        })
      } else {
        callback(500, {
          error: "There was an error on server side!",
        })
      }
    })
  } else {
    callback(500, {
      error: "Invalid request",
    })
  }
}

handler._users.put = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false

  if (phone) {
    if (firstName || lastName || password) {
      data.read("users", phone, (err, user) => {
        if (!err && user) {
          let userData = { ...parseJson(user) }
          if (firstName) {
            userData.firstName = firstName
          }
          if (lastName) {
            userData.lastName = lastName
          }
          if (password) {
            userData.password = hash(password)
          }
          data.update("users", phone, userData, (err) => {
            if (!err) {
              callback(200, {
                message: "User has successfully updated",
              })
            } else {
              callback(400, {
                error: "There was a problem in the server!",
              })
            }
          })
        } else {
          callback(400, {
            error: "There was a problem in the server!",
          })
        }
      })
    } else {
      callback(400, {
        error: "You have a problem in your request!",
      })
    }
  } else {
    callback(400, {
      error: "Sorry, Invalid phone number!",
    })
  }
}

handler._users.delete = (requestProperties, callback) => {
    const phone =
    typeof requestProperties.queryStrings.phone === "string" &&
    requestProperties.queryStrings.phone.trim().length === 11
      ? requestProperties.queryStrings.phone
      : false
    if(phone) {
        data.delete('users', phone, (err) => {
           if(!err) {
            callback(200, {
                message: "User deleted successfully",
              })
           } else {
            callback(400, {
                error: "There was a problem in the server!",
              })
           } 
        })
    } else {
        callback(400, {
            error: "Sorry, Invalid phone number!",
          })
    }
}

// export module
module.exports = handler
