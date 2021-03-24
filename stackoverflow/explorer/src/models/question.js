class Question {
    constructor(pool) {
        this.pool = pool
    }

    async insertQuestion(question, idUser) {
        const queryInsertQuestion = `` +
            `INSERT ` +
            `INTO stackoverflow.question ` +
            `(userFK, score, isAnswered, qtdViews) VALUES ` +
            `(?, ?, ?, ?)`

        return await this.pool.query(queryInsertQuestion, [idUser, question.score, question.isAnswered, question.totalViews])
    }
}

module.exports = Question;
