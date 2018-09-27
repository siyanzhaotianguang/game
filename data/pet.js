class Pet {
    constructor(pid, name, type) {
        this.pid = pid
        this.name = name
        this.type = type
        this.str = Math.ceil(Math.random() * 50) + 50
        this.luck = Math.ceil(Math.random() * 50) + 50
        this.hp = Math.ceil(Math.random() * 500) + 500
        this.agi = Math.ceil(Math.random() * 50) + 50
        this.def = Math.ceil(Math.random() * 50) + 50
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

module.exports = {Pet,RobotPet}