/**
 * Created by MyPC on 2018/7/27
 */
const MongoClient = require('mongodb').MongoClient
const {promisify} = require('util')
const exit = require('../function/exit')
const {MONGODB_URL} = require('../config/serverConfig')
let DB
const DB_NAME = 'game'

function StartDB() {
    MongoClient.connect(MONGODB_URL, {useNewUrlParser: true}, function (err, result) {
        if (err) return exit()
        DB = result
        console.log(`server start at :${process.pid}`)
        DB.on('close', () => {
            return exit()
        })
    })
}

//account
async function QueryAccount(cnd) {
    const col = DB.db(DB_NAME).collection('account')
    let func = promisify(col.findOne).bind(col)
    return await func(cnd)
}

async function InsertAccount(data) {
    const col = DB.db(DB_NAME).collection('account')
    let func = promisify(col.insert).bind(col)
    return await func(data)
}

//post
// async function QueryPost(cnd) {
//     const col = DB.db(DB_NAME).collection('post')
//     let func = promisify(col.findOne).bind(col)
//     return await func(cnd)
// }
//
// async function GetPostList(cnd, option) {
//     const col = DB.db(DB_NAME).collection('post')
//     let func = promisify(col.find(cnd, option).toArray).bind(col.find(cnd, option))
//     let func2 = promisify(col.count).bind(col)
//     return [await func(), await func2(cnd)]
// }
//
// async function InsertPost(data) {
//     const col = DB.db(DB_NAME).collection('post')
//     let func = promisify(col.insert).bind(col)
//     return await func(data)
// }
//
// async function DeletePost(cnd) {
//     const col = DB.db(DB_NAME).collection('post')
//     let func = promisify(col.deleteOne).bind(col)
//     return await func(cnd)
// }
//
// async function ReplyPost(data) {
//     const col = DB.db(DB_NAME).collection('post')
//     let func = promisify(col.update).bind(col)
//     let now = Date.now()
//     return await func({"pid": parseInt(data.pid)}, {
//         "$push": {
//             "content": {
//                 nickname: data.nickname,
//                 time: now,
//                 content: data.content
//             }
//         }, "$set": {updateTime: now}
//     })
// }

async function GetNextUniqueId(name) {
    const col = DB.db(DB_NAME).collection('uniqueId')
    let func = promisify(col.findOneAndUpdate).bind(col)
    let result = await func({_id: name}, {$inc: {[name]: 1}}, {upsert: true, returnOriginal: false})
    return result.value[name]
}

let exportObject = {
    StartDB,

    QueryAccount,
    InsertAccount,
    GetNextUniqueId,

    // QueryPost,
    // GetPostList,
    // InsertPost,
    // ReplyPost,
    // DeletePost
}

module.exports = exportObject
