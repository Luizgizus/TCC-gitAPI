const Request = require("../util/request")
const Question = require("../models/question")
const _ = require("lodash")

class DefaultQuestion {
    constructor() {
        this.score = null
        this.isAnswered = null
        this.totalViews = null
    }
}

class QuestionCtrl {
    constructor(pool) {
        this.request = new Request()
        this.question = new Question(pool)
    }

    async getQuestion(idsUser, site) {
        let question = new DefaultQuestion();
        const questions = []
        let hasNext = null;
        let page = 0;

        do {
            page++;
            const url = `${process.env.URL_API}/${idsUser}/questions?page=${page}&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&site=${site}`;
            const response = await this.request.get(url);

            const data = response.body;
            hasNext = data.has_more;

            for (let i = 0; i < data.items.length; i++) {
                question.score = data.items[i].score
                question.isAnswered = data.items[i].is_answered
                question.totalViews = data.items[i].view_count

                questions.push(question)

                question = new DefaultQuestion()
            }
        } while (hasNext);

        return questions;
    }

    async saveQuestions(questions, idUser) {
        for (let i = 0; i < questions.length; i++) {
            this.question.insertQuestion(questions[i], idUser)
        }
    }

}

module.exports = QuestionCtrl;
