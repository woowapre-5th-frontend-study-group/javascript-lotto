const { MONEY_UNIT, NUM_RANGE } = require("../utils/constants");
const { Random } = require("@woowacourse/mission-utils");

class GameAnswer {
    //prefix 쓰려는데 prettier 설정 때문에 잘 안됨..ㅜㅜ
    constructor(money) {
        this.amount = money / MONEY_UNIT;
        this.answer = [];
    }
    getAmount() {
        return this.amount;
    }
    getAnswer() {
        return this.answer;
    }
    setAnswer() {

    }

    generate() {
        for (var i = 0; i < this.amount; i++) {
            const oneLine = Random.pickUniqueNumbersInRange(NUM_RANGE.START, NUM_RANGE.END, 6);
            this.answer.push(oneLine);
        }
        //console.log(this.answer);
    }
}
module.exports = GameAnswer;