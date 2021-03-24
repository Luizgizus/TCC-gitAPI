const _ = require("lodash");

const RepositoryCtrl = require("./controllers/repositoryCtrl");
const GitCtrl = require("./controllers/gitCtrl");
const SonarCtrl = require("./controllers/sonarCtrl");
const Moment = require('moment')

const MysqlService = require("../dataBase/MySQLService");
const Bluebird = require("bluebird");


class ApiSonaQualityGate {
    constructor() {
        this.pool = MysqlService.getPool()
        this.repositoryCtrl = new RepositoryCtrl(this.pool)
        this.sonarCtrl = new SonarCtrl(this.pool)
        this.gitCtrl = new GitCtrl()
    }

    async getMetricsAndSave(repoData) {
        console.log("getMetricsAndSave - worker - ")
        console.log(repoData)

        if (repoData) {
            console.log("getMetricsAndSave - worker - " + "gettingMetrics")
            let isGetted = false
            let retry = 6
            while (!isGetted && retry >= 0) {
                retry--
                const metrics = await this.sonarCtrl.getMetrics(repoData.repoClonedData)
                if (metrics.length) {
                    console.log("getMetricsAndSave - worker - " + "ok")
                    isGetted = true
                    await this.sonarCtrl.saveMetrics(metrics, repoData.respositories)
                } else {
                    console.log("getMetricsAndSave - worker - " + "waiting 3 seconsd to try again")
                    await Bluebird.delay(10000)
                }
            }
        }
    }

    async getFeatures(worker) {
        const respositories = await this.repositoryCtrl.getRepositoryData();
        for (let i = 0; i < respositories.length; i++) {
            try {
                console.log("\n\ngetFeatures - master - " + `${i} - tring to clone url ${respositories[i].url}`);
                console.log("getFeatures - master - " + Moment().format("DD/MM/YYYY HH:mm:ss"));
                console.log("getFeatures - master - " + "cloning")
                const repoClonedData = await this.gitCtrl.cloneRepo(respositories[i])
                if (repoClonedData.repoPath.length !== 0) {
                    console.log("getFeatures - master - " + "sendToQualityGate")
                    await this.sonarCtrl.sendToQualityGate(repoClonedData)
                    console.log("getFeatures - master - " + "sent")

                    const dataToGetMetrics = {
                        respositories: respositories[i],
                        repoClonedData: repoClonedData
                    }

                    worker.send(dataToGetMetrics)

                    this.gitCtrl.deleteClonedRepo(repoClonedData.repoPath)
                    console.log("getFeatures - master - " + Moment().format("DD/MM/YYYY HH:mm:ss"));
                }
            } catch (err) {
                console.log("getFeatures - master - " + err)
            }
        }
    }
}

module.exports = ApiSonaQualityGate;
