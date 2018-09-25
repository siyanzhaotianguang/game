/**
 * Created by MyPC on 2018/7/31
 */

module.exports = async (req, res, next) => {
    let returnData = {code: 10099, msg: '请先登录'}
    let uid = req.session.uid
    if (!uid) return res.json(returnData)
    next()

}