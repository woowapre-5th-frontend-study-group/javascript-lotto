const { MONEY_UNIT, NUM_RANGE } = require("../utils/constants");
const { Random } = require("@woowacourse/mission-utils");

class GameAnswer {
    
    constructor(money) {
        this.amount = money / MONEY_UNIT;
        this.answer = [];
    }

    getAmount() {
        return this.amount;
    }

    generate() {
        for (var i = 0; i < this.amount; i++) {
            const oneLine = Random.pickUniqueNumbersInRange(NUM_RANGE.START, NUM_RANGE.END, 6);
            oneLine.sort((a, b) => a - b);
            this.answer.push(oneLine);
        }
        return this.answer;
    }
    getAnswer() {
        return this.answer;
    }
}
module.exports = GameAnswer;