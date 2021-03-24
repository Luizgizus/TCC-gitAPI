const Request = require("../util/request")
const Answer = require("../models/answer")
const _ = require("lodash")

class DefaultAnswer {
    constructor() {
        this.isAccepted = null
        this.score = null
    }
}

class AnswerCtrl {
    constructor(pool) {
        this.request = new Request()
        this.answer = new Answer(pool)
    }

    async getAnswer(idsUser, site) {
        let answer = new DefaultAnswer();
        const answers = []
        let hasNext = null;
        let page = 0;

        do {
            page++;
            const url = `${process.env.URL_API}/${idsUser}/answers?page=${page}&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&site=${site}`;
            const response = await this.request.get(url);

            const data = response.body;
            hasNext = data.has_more;

            for (let i = 0; i < data.items.length; i++) {
                answer.isAccepted = data.items[i].is_accepted
                answer.score = data.items[i].score

                answers.push(answer)

                answer = new DefaultAnswer()
            }
        } while (hasNext);

        return answers;
    }

    async saveAnswers(answers, idUser) {
        for (let i = 0; i < answers.length; i++) {
            this.answer.insertAnswer(answers[i], idUser)
        }

    }

}

module.exports = AnswerCtrl;
