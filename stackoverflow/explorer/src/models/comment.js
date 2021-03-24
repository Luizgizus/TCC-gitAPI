class Comment {
    constructor(pool) {
        this.pool = pool
    }

    async insertComment(comment, idUser) {
        const queryInsertComment = `` +
            `INSERT ` +
            `INTO stackoverflow.comment ` +
            `(userFK, score, createdAt) VALUES ` +
            `(?, ?, ?)`

        return await this.pool.query(queryInsertComment, [idUser, comment.score, comment.createdAt])
    }
}

module.exports = Comment;
