/**
 * Created by MyPC on 2018/9/25
 */

let {io} = require('./bin/www')
const {QueryAccount, InsertAccount, GetNextUniqueId} = require('./data/db')
const {argsCheck} = require('./function/argsCheck')
const {promisify} = require('util')

io.on('connection', function (socket) {

    console.log(`${socket.id} id connected`)

    socket.on('register', async (nickname, password, cb) => {
        let returnData = {code: 0, msg: 'suc', data: null}
        try {
            let checkResult = argsCheck({nickname, password}, 'a')
            if (checkResult) return cb(checkResult)
            let account = await QueryAccount({nickname})
            if (account) {
                returnData.msg = '用户已存在'
                returnData.code = 10002
                return cb(returnData)
            }
            let uid = await GetNextUniqueId('uid')
            await InsertAccount({uid, nickname, password})
            returnData.data = uid
            return cb(returnData)
        } catch (e) {
            returnData.msg = e
            returnData.code = 10001
            cb(returnData)
        }
    })

    socket.on('login', async (nickname, password, cb) => {
        let returnData = {code: 0, msg: 'suc', data: null}
        try {
            let account = await QueryAccount({nickname, password})
            if (!account) {
                returnData.msg = '验证失败'
                returnData.code = 10002
                return cb(returnData)
            }
            returnData.data = account
            cb(returnData)
        } catch (e) {
            returnData.msg = e
            returnData.code = 10001
            cb(returnData)
        }
    })
    // console.log('client connection')
    //
    // //触发客户端注册的自定义事件
    // socket.emit('ClientListener', {hello: 'world'})
    //
    // //注册服务器的自定义事件
    // socket.on('ServerListener', function (data, callback) {
    //     console.log('ServerListener email:' + data['email'])
    //     callback({abc: 123})
    // })

    //断开连接会发送
    socket.on('disconnect', function () {
        console.log('client disconnected')
    })

})