/**
 * Created by MyPC on 2018/7/29
 */

const ArgsRules = {
    //账号
    'a_nickname': 'str1_6',
    'a_password': 'str6_12',

    //宠物
    'p_name': 'str1_6',
}

const RuleFunc = {
    'str1_6': function (arg) {
        if (!arg && arg !== 0) return false
        let length = [...arg]
        if (length < 1 || length > 6) return false
        return true
    },
    'str6_12': function (arg) {
        if (!arg && arg !== 0) return false
        let length = [...arg]
        if (length < 6 || length > 12) return false
        return true
    },
    'content': function (arg) {
        if (!arg && arg !== 0) return false

        // let length = [...arg]
        // if (length === 0) return false
        return true
    }
}

module.exports = {ArgsRules, RuleFunc}