class Contribuition {
    constructor(pool) {
        this.pool = pool
    }

    getStringContribuition(userName) {
        let stringQuery =
            `query { 
                search(query:"${userName}", type:USER, first: 1) {
                    nodes {
                        ... on User {
                            contributionsCollection {
                                totalCommitContributions
                                totalIssueContributions
                                totalPullRequestContributions
                                totalPullRequestReviewContributions
                                totalRepositoriesWithContributedCommits
                                totalRepositoriesWithContributedIssues
                                totalRepositoriesWithContributedPullRequestReviews
                                totalRepositoryContributions
                                totalRepositoriesWithContributedPullRequests
                            }
                        }
                    }
                }
            }`;

        return stringQuery;
    }

    async insertContribuition(contribuition, idUser) {
        const queryInsertContribuition = `` +
            `INSERT ` +
            `INTO github.contribuition ` +
            `(
                user_idUser,
                qtdCommitContributions,
                qtdIssueContributions,
                qtdPullRequestContributions,
                qtdPullRequestReviewContributions,
                qtdRepositoriesWithContributedCommits,
                qtdRepositoriesWithContributedIssues,
                qtdRepositoriesWithContributedPullRequestReviews,
                qtdRepositoryContributions,
                qtdRepositoriesWithContributedPullRequests
            ) VALUES ` +
            `(?,?,?, ?, ?, ?, ?, ?, ?, ?)`

        return await this.pool.query(queryInsertContribuition,
            [
                idUser,
                contribuition.totalCommitContributions,
                contribuition.totalIssueContributions,
                contribuition.totalPullRequestContributions,
                contribuition.totalPullRequestReviewContributions,
                contribuition.totalRepositoriesWithContributedCommits,
                contribuition.totalRepositoriesWithContributedIssues,
                contribuition.totalRepositoriesWithContributedPullRequestReviews,
                contribuition.totalRepositoryContributions,
                contribuition.totalRepositoriesWithContributedPullRequests
            ]
        )
    }
}

module.exports = Contribuition;
