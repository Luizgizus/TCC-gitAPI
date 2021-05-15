const _ = require("lodash")
const cmd = require('node-cmd');
const Request = require("../util/request")
const SonarMetric = require("../models/sonarMetrics")

class SonarCtrl {
    constructor(pool) {
        this.request = new Request()
        this.sonarMetric = new SonarMetric(pool)
    }

    async sendToQualityGate(repoClonedData) {
        const logExecution = cmd.runSync(`cd ${repoClonedData.repoPath} && sonar-scanner -Dsonar.login=admin -Dsonar.password=Celular82388003* -Dsonar.projectKey=${repoClonedData.repoName}`)
        if (
            logExecution.err === null &&
            logExecution.stderr === null &&
            logExecution.data.indexOf("EXECUTION SUCCESS") !== -1) {
            console.log("EXECUTION SUCCESS")
            return true
        } else {
            console.log("EXECUTION ERROR")
            return false
        }
    }

    async getMetrics(repoClonedData) {
        const metrics = await this.request.get(`${process.env.URL_API}/api/measures/component?component=${repoClonedData.repoName}&metricKeys=${process.env.METRICS}`)
        return metrics.body.component.measures
    }

    getmetricValueByName(metrics, name) {
        const indexOfMentric = _.findIndex(metrics, function (o) { return o.metric === name; })
        if (metrics && metrics[indexOfMentric]) {
            return metrics[indexOfMentric].value
        } else {
            return null
        }
    }

    checkHasMetric(metrics, name) {
        const indexOfMentric = _.findIndex(metrics, function (o) { return o.metric === name; })
        if (metrics && metrics[indexOfMentric]) {
            return metrics[indexOfMentric].value
        } else {
            return null
        }
    }

    async saveMetrics(metrics, respository) {
        const hasMetric = await this.sonarMetric.checkHasMetric(respository.idUser, respository.idRepository)

        if (hasMetric.length === 0) {
            console.log("saveMetrics - worker - ")
            console.log(metrics)

            const metricsNameAndValue = {
                ncloc: this.getmetricValueByName(metrics, "ncloc"),
                qtdVulnerabilities: this.getmetricValueByName(metrics, "vulnerabilities"),
                qtdBugs: this.getmetricValueByName(metrics, "bugs"),
                qtdCodeSmells: this.getmetricValueByName(metrics, "code_smells"),
                reliabilityRating: this.getmetricValueByName(metrics, "reliability_rating"),
                qtdDuplicatedFiles: this.getmetricValueByName(metrics, "duplicated_files"),
                testCoverage: this.getmetricValueByName(metrics, "coverage"),
                commentLinesDensity: this.getmetricValueByName(metrics, "comment_lines_density"),
                fileComplexity: this.getmetricValueByName(metrics, "file_complexity"),
                qtdViolation: this.getmetricValueByName(metrics, "violations"),
                manutenibilityRating: this.getmetricValueByName(metrics, "sqale_rating"),
                securityRating: this.getmetricValueByName(metrics, "security_rating"),
            }

            await this.sonarMetric.insertSonarMetric(respository.idUser, respository.idRepository, metricsNameAndValue)
        } else {
            console.log("saveMetrics - worker - already Has metric saved")
        }
    }
}

module.exports = SonarCtrl;