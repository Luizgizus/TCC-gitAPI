class Answer {
    constructor(pool) {
        this.pool = pool
    }

    async insertAnswer(answer, idUser) {
        const queryInsertAnswer = `` +
            `INSERT ` +
            `INTO stackoverflow.answer ` +
            `(userFK, isAccepted, score) VALUES ` +
            `(?, ?, ?)`

        return await this.pool.query(queryInsertAnswer, [idUser, answer.isAccepted, answer.score])
    }
}

module.exports = Answer;
