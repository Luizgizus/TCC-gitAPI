

class Repository {
    constructor(pool) {
        this.pool = pool
    }

    getStringRepositories(userName) {
        let stringQuery =
            `` +
            `query {
            search(query:"${userName}", type:USER, first: 1) {
                nodes {
                    ...on User {
                        repositories(last:100) {
                            pageInfo {
                                hasNextPage
                                endCursor
                            }
                            totalCount
                            nodes {
                                id
                                name
                                url
                                isEmpty
                                diskUsage
                                primaryLanguage{
                                    name
                                }
                                languages(first: 10) {
                                    nodes {
                                        name
                                    }
                                    totalSize
                                }
                                pullRequests(first: 100) {
                                    totalCount
                                    nodes {
                                        closed
                                        merged
                                    }
                                }
                                vulnerabilityAlerts {
                                    totalCount
                                }
                                stargazers {
                                    totalCount
                                }
                                watchers {
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

    async insertRepository(repository, repoPrimaryLanguage, idUser) {
        const queryInsertRepository = `` +
            `INSERT ` +
            `INTO github.repository ` +
            `(primaryLanguage, name, userFK, isEmpty, url, qtdStars, qtdWatchers, qtdVulnerability, diskUsage, linesOfCode) VALUES ` +
            `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        return await this.pool.query(queryInsertRepository,
            [
                repoPrimaryLanguage,
                repository.name,
                idUser,
                repository.isEmpty,
                repository.url,
                repository.stargazers.totalCount,
                repository.watchers.totalCount,
                repository.vulnerabilityAlerts.totalCount,
                repository.diskUsage,
                repository.languages.totalSize,
            ]
        )
    }

    async insertRepositoryLanguages(languageRepo, idRepo) {
        const queryInsertRepositoryLanguages = `` +
            `INSERT ` +
            `INTO github.repositorylanguages ` +
            `(name, repositoryFK) VALUES ` +
            `(?, ?)`

        return await this.pool.query(queryInsertRepositoryLanguages, [languageRepo.name, idRepo])
    }

    async insertRepositoryPullRequests(pullRequest, idRepo) {
        const queryInsertRepositoryLanguages = `` +
            `INSERT ` +
            `INTO github.repositorypullrequests ` +
            `(repositoryFK, isClosed, isMerged) VALUES ` +
            `(?, ?, ?)`

        return await this.pool.query(queryInsertRepositoryLanguages, [idRepo, pullRequest.closed, pullRequest.merged])
    }

}

module.exports = Repository;
