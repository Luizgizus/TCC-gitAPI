

class Repository {
    constructor(pool) {
        this.pool = pool
    }

    async getRepositoryUrls() {
        const queryInsertRepositoryLanguages = `` +
            `SELECT ` +
            `u.idUser, r.idRepository, r.url ` +
            `FROM github.repository r ` +

            `JOIN github.user u on u.idUser = r.userFK ` +

            `WHERE 1=1 ` +
            `AND isEmpty = 0 ` +
            `AND r.idRepository not in (SELECT repositoryFK FROM github.sonarqualitymetrics) ` +
            `AND linesOfCode > 0 ` +
            `AND diskUsage > 0 ` +
            `AND userFK in () ` +

            `ORDER BY RAND() ` +
            `LIMIT ${process.env.QTD_REPOS}`

        return await this.pool.query(queryInsertRepositoryLanguages)
    }
}

module.exports = Repository;
