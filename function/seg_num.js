/**
 * Created by yuqiangwen on 2018/10/9
 */

function segmentationNum(num, count, max) {
    if (count < 1 || num <= 0) return []
    if (count === 1) return [num]
    if (max * count < num) throw 'args error'
    let flagArray = []
    let returnArray = []
    for (let i = 0; i < count - 1; i++) flagArray[i] = Math.floor(Math.random() * num)
    flagArray.sort((a, b) => a - b)
    for (let i = 0; i < count; i++) {
        let minNum = flagArray[i - 1] || 0
        let maxNum = flagArray[i] >= 0 ? flagArray[i] : num
        returnArray[i] = maxNum - minNum
    }
    returnArray = check(returnArray, max)
    return returnArray
}

function check(array, max) {
    let indexArr = []
    let addNum = 0
    for (let i = 0; i < array.length; i++) {
        let num = array[i]
        if (num >= max) {
            addNum += num - max
            array[i] = max
            indexArr.push(i)
        }
    }
    let fillNum = array.length - indexArr.length
    if (addNum > 0) {
        let addArray = segmentationNum(addNum, fillNum, max)
        for (let item of indexArr) addArray.splice(item, 0, 0)
        for (let i = 0; i < array.length; i++) array[i] += addArray[i]
        return check(array, max)
    }
    return array
}

function shuffle(a) {
    let i = a.length
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [a[j], a[i]] = [a[i], a[j]]
    }
}

/**
 * 分割数字
 * @param {number} num 
 * @param {number} count 
 * @param {number} max 
 */
const main = (num, count, max) => {
    let arr = segmentationNum(addNum, count, max)
    shuffle(arr)
    return arr
}

module.exports = main