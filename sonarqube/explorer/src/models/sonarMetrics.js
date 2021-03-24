

class SonarMetrics {
    constructor(pool) {
        this.pool = pool
    }

    async insertSonarMetric(idUser, idRepository, metrics) {
        const queryInsertSonarMetric = `` +
            `INSERT INTO ` +
            `github.sonarqualitymetrics ` +
            `(
                repositoryFK,
                userFK,
                ncloc,
                qtdVulnerabilities,
                qtdBugs,
                qtdCodeSmells,
                reliabilityRating,
                qtdDuplicatedFiles,
                testCoverage,
                commentLinesDensity,
                fileComplexity,
                qtdViolation,
                manutenibilityRating,
                securityRating
            ) VALUES ` +
            `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

        return await this.pool.query(queryInsertSonarMetric, [
            idRepository,
            idUser,
            metrics.ncloc,
            metrics.qtdVulnerabilities,
            metrics.qtdBugs,
            metrics.qtdCodeSmells,
            metrics.reliabilityRating,
            metrics.qtdDuplicatedFiles,
            metrics.testCoverage,
            metrics.commentLinesDensity,
            metrics.fileComplexity,
            metrics.qtdViolation,
            metrics.manutenibilityRating,
            metrics.securityRating,
        ])
    }

    async checkHasMetric(idUser, idRepository) {
        const queryGetSonarMetric = `` +
            `SELECT idSonarQualityMetrics FROM github.sonarqualitymetrics ` +
            `WHERE 1=1 ` +
            `AND repositoryFK = ? ` +
            `AND userFK = ?`

        return await this.pool.query(queryGetSonarMetric, [
            idRepository,
            idUser
        ])
    }
}

module.exports = SonarMetrics;
