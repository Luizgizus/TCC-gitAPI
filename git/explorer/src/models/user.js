class User {
    constructor(pool) {
        this.pool = pool
        this.idsTryed = {}
    }

    getStringAleatoryUsers() {
        let startQtd = null
        while (true) {
            startQtd = parseInt(Math.random() * 5000);
            if (!this.idsTryed[startQtd]) {
                this.idsTryed[startQtd] = true;
                break;
            }
        }
        let stringQuery =
            `` +
            `query {
                search(type:REPOSITORY, query:"stars:${startQtd}", last:100) {
                    nodes {
                        ... on Repository {
                            owner {
                                ... on User {
                                    name
                                    login
                                    id
                                    email
                                    createdAt
                                    followers {
                                        totalCount
                                    }
                                }
                            }
                        }
                    }
                }
            }`;

        return stringQuery;
    }

    async insertUser(user) {
        const queryInsertUser = `` +
            `INSERT ` +
            `INTO github.user ` +
            `(idUserGit, name, login, email, qtdFollowers, createdAt) VALUES ` +
            `(?, ?, ?, ?, ?, ?)`

        return await this.pool.query(queryInsertUser, [user.id, user.name, user.login, user.email, user.followers.totalCount, user.createdAt])
    }

    async checkHasUser(login) {
        const queryInsertUser = `` +
            `SELECT 1 FROM github.user ` +
            `where login = ?`

        return (await this.pool.query(queryInsertUser, [login])).pop()
    }
}

module.exports = User;
