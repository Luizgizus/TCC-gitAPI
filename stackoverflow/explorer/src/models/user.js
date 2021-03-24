class User {
    constructor(pool) {
        this.pool = pool
    }

    async insertUser(user, githubLink) {

        const queryInsertUser = `` +
            `INSERT ` +
            `INTO stackoverflow.user ` +
            `(idAccountStackOverflow, idUserStackOverflow, gitLink, name, reputation, createdAt) VALUES ` +
            `(?, ?, ?, ?, ?, ?)`

        return await this.pool.query(
            queryInsertUser,
            [
                user.idAccountStackOverflow,
                user.idUserStackOverflow,
                githubLink,
                user.name,
                user.reputation,
                user.createdAt
            ]
        )
    }

    async checkHasUserById(idUser) {

        const queryCheckHasUser = `` +
            `SELECT 1 FROM stackoverflow.user ` +
            `WHERE idUserStackOverflow = ?`

        return (await this.pool.query(queryCheckHasUser, [idUser])).pop()
    }
}

module.exports = User;
