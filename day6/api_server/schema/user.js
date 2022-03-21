const joi = require('joi')

const userName = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()


exports.req_user_schema = {
    body: {
        userName,
        password,
    }
}