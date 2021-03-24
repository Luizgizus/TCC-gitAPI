class Issue {
    constructor(pool) {
        this.pool = pool
    }

    getStringIssues(userName) {
        let stringQuery =
            `query { 
                search(query:"${userName}", type:USER, first: 1) {
                    nodes {
                        ... on User {
                            issues(last: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                                totalCount
                                nodes {
                                    closed
                                    reactions(last: 100) {
                                        nodes {
                                            content
                                        }
                                    }
                                    comments {
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

    async insertIssue(issues, idUser) {
        const queryInsertIssue = `` +
            `INSERT ` +
            `INTO github.issue ` +
            `(isClosed, qtdComents, userFK) VALUES ` +
            `(?, ?, ?)`

        return await this.pool.query(queryInsertIssue,
            [
                issues.closed,
                issues.comments.totalCount,
                idUser
            ]
        )
    }

    async insertIssueReaction(issueReaction, idIssue) {
        const queryInsertIssueReaction = `` +
            `INSERT ` +
            `INTO github.issuereaction ` +
            `(type, issueFK) VALUES ` +
            `(?, ?)`


        return await this.pool.query(queryInsertIssueReaction, [issueReaction.content, idIssue])
    }
}

module.exports = Issue;
