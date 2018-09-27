/**
 * Created by MyPC on 2018/8/1
 */
const {PRO_SERVER_URL, DEV_SERVER_URL} = require('./urlConfig')
const {PRO_MONGODB_URL,DEV_MONGODB_URL} = require('./dbconfig')

const dev = {
    SERVER_URL:DEV_SERVER_URL,
    MONGODB_URL:DEV_MONGODB_URL
}

const pro = {
    SERVER_URL:PRO_SERVER_URL,
    MONGODB_URL:PRO_MONGODB_URL
}

module.exports = pro