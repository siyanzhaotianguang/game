let seg_num = require('../function/seg_num')

class Pet {
    constructor(pid, name, type) {
        let addPointArr = seg_num(180, 5, 50)

        this.pid = pid
        this.name = name
        this.type = type
        this.str = addPointArr[0] + 50
        this.luck = addPointArr[1] + 50
        this.hp = (addPointArr[2] + 50) * 10
        this.agi = addPointArr[3] + 50
        this.def = addPointArr[4] + 50
        this.feedDegree = 100//饱食度
        this.vigor = 100//精力 
        this.lv = 1
        this.exp = 0
    }
}

class RobotPet {
    constructor(level, name, type) {
        this.name = name
        this.type = type
        this.str = Math.ceil(Math.random() * 20) + 50 + level * 10
        this.luck = Math.ceil(Math.random() * 20) + 50 + level * 10
        this.hp = Math.ceil(Math.random() * 200) + 500 + level * 100
        this.agi = Math.ceil(Math.random() * 20) + 50 + level * 10
        this.def = Math.ceil(Math.random() * 20) + 50 + level * 10
        this.feedDegree = 100//饱食度
        this.vigor = 100//精力
        this.lv = level
        this.exp = 0
    }
}

module.exports = { Pet, RobotPet }