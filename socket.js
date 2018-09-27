/**
 * Created by MyPC on 2018/9/25
 */

let io = null
const {QueryAccount, InsertAccount, UpdateAccount, GetNextUniqueId, InsertPet, QueryPet} = require('./data/db')
const argsCheck = require('./function/argsCheck')
const {promisify} = require('util')
const sleep = promisify(setTimeout)
const MD5 = require('./function/md5')
const {Pet} = require('./data/pet')
const AccountObj = {}


function _dealErr(e, returnData, cb) {
    console.error(e)
    returnData.msg = e
    returnData.code = 10001
    cb(JSON.stringify(returnData))
}

function _dealNoLogin(returnData, cb) {
    returnData.msg = '请先登录'
    returnData.code = 10099
    cb(JSON.stringify(returnData))
}

async function startIo() {
    io.on('connection', function (socket) {

        console.log(`${socket.id} id connected`)

        socket.on('register', async (data, cb) => {
            let returnData = {code: 0, msg: 'suc', data: null}
            try {
                let {nickname, password} = data
                let checkResult = argsCheck({nickname, password}, 'a')
                if (checkResult) return cb(JSON.stringify(checkResult))
                let account = await QueryAccount({nickname})
                if (account) {
                    returnData.msg = '用户已存在'
                    returnData.code = 10002
                    return cb(JSON.stringify(returnData))
                }
                let uid = await GetNextUniqueId('uid')
                await InsertAccount({uid, nickname, password: MD5(password)})
                returnData.data = uid
                return cb(JSON.stringify(returnData))
            } catch (e) {
                _dealErr(e, returnData, cb)
            }
        })

        socket.on('login', async (data, cb) => {
            let returnData = {code: 0, msg: 'suc', data: null}
            try {
                let {nickname, password} = data
                let account = await QueryAccount({nickname, password: MD5(password)})
                if (!account) {
                    returnData.msg = '验证失败'
                    returnData.code = 10002
                    return cb(JSON.stringify(returnData))
                }
                socket.uid = account.uid
                // socket.account = account
                AccountObj[socket.uid] = account
                returnData.data = nickname
                cb(JSON.stringify(returnData))
            } catch (e) {
                _dealErr(e, returnData, cb)
            }
        })

        //获取宠物
        socket.on('bind pet', async (data, cb) => {
            let returnData = {code: 0, msg: 'suc', data: null}
            try {
                if (!socket.uid) {
                    return _dealNoLogin(returnData, cb)
                }
                let {name} = data
                let checkResult = argsCheck({name}, 'p')
                if (checkResult) return cb(JSON.stringify(checkResult))
                let pid = await GetNextUniqueId('pid')
                let pet = new Pet(pid, name, 1)
                let account = AccountObj[socket.uid]
                if (!account.pets) account.pets = []
                account.pets.push(pid)
                await InsertPet(pet)
                cb(JSON.stringify(returnData))
            } catch (e) {
                _dealErr(e, returnData, cb)
            }
        })

        //断开连接更新账号进DB
        socket.on('disconnect', async () => {
            if (socket.uid) {
                let account = AccountObj[socket.uid]
                await UpdateAccount(account)
            }
            console.log('client disconnected')
        })
    })
}

let exportsObj = {}

async function main() {
    while (!exportsObj.io) {
        await sleep(50)
    }
    io = exportsObj.io
    startIo()
}

main()

module.exports = exportsObj