let { Pet } = require('../data/pet')

class Fight {
    constructor(fighter1, fighter2) {
        if (!(fighter1 instanceof Pet) || !(fighter2 instanceof Pet)) {
            return console.error('请传入2只宠物')
        }
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fight = this.fight.bind(this);
    }
    static _attack(attacker, defender) {//攻击
        let DP = 300 / (300 + defender.def)//伤害比例
        let damage = Math.floor(attacker.str * DP)//计算基础伤害
        let damageFloat = Math.floor(damage * 0.2)//浮动伤害
        damage += Math.floor(Math.random() * damageFloat - damageFloat / 2)

        //暴击加成放后面
        let CR = Math.atan(attacker.luck / 200) / (Math.PI / 2)//暴击几率
        let isCri = Math.random() <= CR ? 1 : 0//是否触发暴击
        let criBouns = Math.floor(0.5 * isCri * damage)
        damage = damage + criBouns
        
        //血量减少
        defender.curHp -= damage
        defender.curHp = defender.curHp < 0 ? 0 : defender.curHp

        //输出日志
        let criStr = isCri ? '暴击!' : ''
        return `${criStr}${attacker.name} 对 ${defender.name} 造成了 ${damage} 点伤害 , ${defender.name} 剩余hp:${defender.curHp}`
    }

    fight() {//战斗
        let fighter1 = this.fighter1
        let fighter2 = this.fighter2
        //每次战斗初始化当前血量
        fighter1.curHp = fighter1.hp
        fighter2.curHp = fighter2.hp

        let attacker//先手
        if (fighter1.agi === fighter2.agi) {
            attacker = Math.random() >= 0.5 ? fighter1 : fighter2
        } else {
            attacker = fighter1.agi > fighter2.agi ? fighter1 : fighter2
        }
        let defender = attacker === fighter1 ? fighter2 : fighter1//后手
        let fightLogs = ['战斗开始!']//战斗记录
        function _getCopyObj(obj) {//获取copy对象
            return JSON.parse(JSON.stringify(obj))
        }
        function _changeAttackerAndDefender(attacker, defender) {//攻守交换
            return [defender, attacker]
        }

        while (true) {//轮流攻击
            if (fighter1.curHp <= 0 && fighter2.curHp <= 0) {
                fightLogs.push('双方打成了平手')
                return { winner: null, fightLogs }
            }
            if (fighter1.curHp <= 0) {
                fightLogs.push(`${fighter2.name}获得了胜利`)
                return { winner: fighter2, fightLogs }
            }
            if (fighter2.curHp <= 0) {
                fightLogs.push(`${fighter1.name}获得了胜利`)
                return { winner: fighter1, fightLogs }
            }
            fightLogs.push(Fight._attack(attacker, defender))
            let changeArr = _changeAttackerAndDefender(attacker, defender)
            defender = changeArr[1]
            attacker = changeArr[0]
            // console.log(`attacker:${attacker.name},defender:${defender.name}`)
        }
    }
}

module.exports = Fight