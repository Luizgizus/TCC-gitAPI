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
        // const respositories = await this.repositoryCtrl.getRepositoryData();
        const respositories = [{ idUser: 20958, idRepository: 852304, url: "https://github.com/othomann/test_clone" },
        { idUser: 20959, idRepository: 852310, url: "https://github.com/dbaeumer/azure-node-test" },
        { idUser: 20958, idRepository: 852286, url: "https://github.com/othomann/Toolint-tests---Empty-TC-Add-Tools---2019-02-21T15-12-57.070Z" },
        { idUser: 20958, idRepository: 852227, url: "https://github.com/othomann/dev-echo-module" },
        { idUser: 20958, idRepository: 852218, url: "https://github.com/othomann/simple-project" },
        { idUser: 20958, idRepository: 852219, url: "https://github.com/othomann/simple-maven-project" },
        { idUser: 20959, idRepository: 852315, url: "https://github.com/dbaeumer/gitnav" },
        { idUser: 20959, idRepository: 852322, url: "https://github.com/dbaeumer/dotfiles" },
        { idUser: 20958, idRepository: 852230, url: "https://github.com/othomann/demoSimpleApp-echo" },
        { idUser: 20958, idRepository: 852228, url: "https://github.com/othomann/dev-simple-app" },
        { idUser: 20958, idRepository: 852229, url: "https://github.com/othomann/demoSimpleApp-app" },
        { idUser: 20958, idRepository: 852220, url: "https://github.com/othomann/maven-example" },
        { idUser: 20955, idRepository: 852140, url: "https://github.com/weinand/vscode-electron-debug" },
        { idUser: 20959, idRepository: 852312, url: "https://github.com/dbaeumer/vscode-eslint-602" },
        { idUser: 20955, idRepository: 852147, url: "https://github.com/weinand/applescript-json" },
        { idUser: 20958, idRepository: 852245, url: "https://github.com/snorthov/node-http2" },
        { idUser: 20955, idRepository: 852139, url: "https://github.com/weinand/golang-vscode" },
        { idUser: 20959, idRepository: 852317, url: "https://github.com/dbaeumer/eslint-demo" },
        { idUser: 20958, idRepository: 852266, url: "https://github.com/othomann/environment-jayriver-production" },
        { idUser: 20958, idRepository: 852263, url: "https://github.com/othomann/environment-stormtide-staging" },
        { idUser: 20958, idRepository: 852254, url: "https://github.com/othomann/environment-elkfortune-production" },
        { idUser: 20958, idRepository: 852283, url: "https://github.com/othomann/environment-skinnerpie-staging" },
        { idUser: 20958, idRepository: 852277, url: "https://github.com/othomann/environment-skinnerswift-production" },
        { idUser: 20958, idRepository: 852271, url: "https://github.com/othomann/environment-raccoonbrass-production" },
        { idUser: 20958, idRepository: 852268, url: "https://github.com/othomann/environment-pythonphase-production" },
        { idUser: 20958, idRepository: 852265, url: "https://github.com/othomann/environment-jayriver-staging" },
        { idUser: 20958, idRepository: 852262, url: "https://github.com/othomann/environment-masterribbon-production" },
        { idUser: 20958, idRepository: 852282, url: "https://github.com/othomann/environment-flamemulberry-production" },
        { idUser: 20958, idRepository: 852279, url: "https://github.com/othomann/environment-volespeckle-production" },
        { idUser: 20958, idRepository: 852252, url: "https://github.com/othomann/environment-ocelotfeather-production" },
        { idUser: 20958, idRepository: 852273, url: "https://github.com/othomann/environment-oxstream-production" },
        { idUser: 20958, idRepository: 852270, url: "https://github.com/othomann/environment-raccoonbrass-staging" },
        { idUser: 20958, idRepository: 852267, url: "https://github.com/othomann/environment-pythonphase-staging" },
        { idUser: 20958, idRepository: 852264, url: "https://github.com/othomann/environment-stormtide-production" },
        { idUser: 20958, idRepository: 852258, url: "https://github.com/othomann/environment-toothwater-production" },
        { idUser: 20958, idRepository: 852281, url: "https://github.com/othomann/environment-flamemulberry-staging" },
        { idUser: 20958, idRepository: 852278, url: "https://github.com/othomann/environment-volespeckle-staging" },
        { idUser: 20958, idRepository: 852251, url: "https://github.com/othomann/environment-ocelotfeather-staging" },
        { idUser: 20958, idRepository: 852275, url: "https://github.com/othomann/environment-butterflyevening-production" },
        { idUser: 20958, idRepository: 852248, url: "https://github.com/othomann/environment-guardiangrove-production" },
        { idUser: 20958, idRepository: 852272, url: "https://github.com/othomann/environment-oxstream-staging" },
        { idUser: 20958, idRepository: 852269, url: "https://github.com/othomann/environment-binderebony-staging" },
        { idUser: 20958, idRepository: 852260, url: "https://github.com/othomann/environment-spearperidot-production" },
        { idUser: 20958, idRepository: 852274, url: "https://github.com/othomann/environment-butterflyevening-staging" },
        { idUser: 20958, idRepository: 852247, url: "https://github.com/othomann/environment-guardiangrove-staging" },
        { idUser: 20958, idRepository: 852256, url: "https://github.com/othomann/environment-antelopecopper-production" },
        { idUser: 20958, idRepository: 852253, url: "https://github.com/othomann/environment-elkfortune-staging" },
        { idUser: 20958, idRepository: 852276, url: "https://github.com/othomann/environment-skinnerswift-staging" },
        { idUser: 20958, idRepository: 852261, url: "https://github.com/othomann/environment-masterribbon-staging" },
        { idUser: 20958, idRepository: 852255, url: "https://github.com/othomann/environment-antelopecopper-staging" },
        { idUser: 20958, idRepository: 852257, url: "https://github.com/othomann/environment-toothwater-staging" },
        { idUser: 20958, idRepository: 852299, url: "https://github.com/othomann/hello-tekton" },
        { idUser: 20958, idRepository: 852259, url: "https://github.com/othomann/environment-spearperidot-staging" },
        { idUser: 20958, idRepository: 852294, url: "https://github.com/othomann/hello-containers" },
        { idUser: 20958, idRepository: 852210, url: "https://github.com/jparra5/dra_devops_gate" },
        { idUser: 20959, idRepository: 852320, url: "https://github.com/dbaeumer/vscode-snippet-insert" },
        { idUser: 20959, idRepository: 852314, url: "https://github.com/dbaeumer/vscode-lsp-488" },
        { idUser: 20955, idRepository: 852150, url: "https://github.com/weinand/vscode-auth-test" },
        { idUser: 20958, idRepository: 852236, url: "https://github.com/othomann/london-simple-cf-app" },
        { idUser: 20958, idRepository: 852223, url: "https://github.com/othomann/bubble" },
        { idUser: 20955, idRepository: 852144, url: "https://github.com/weinand/server-ready" },
        { idUser: 20958, idRepository: 852225, url: "https://github.com/othomann/DemoDRA" },
        { idUser: 20958, idRepository: 852242, url: "https://github.com/othomann/london-simple" },
        { idUser: 20958, idRepository: 852285, url: "https://github.com/othomann/devops-insights-20190205220354281" },
        { idUser: 20958, idRepository: 852287, url: "https://github.com/othomann/devops-insights-20190222182252145" },
        { idUser: 20959, idRepository: 852318, url: "https://github.com/dbaeumer/CAHours" },
        { idUser: 20958, idRepository: 852209, url: "https://github.com/jparra5/dra_upload_results" },
        { idUser: 20958, idRepository: 852289, url: "https://github.com/open-toolchain/node-make-sync" },
        { idUser: 20958, idRepository: 852305, url: "https://github.com/othomann/hello-helm" },
        { idUser: 20958, idRepository: 852303, url: "https://github.com/othomann/simple-20200423160616567" },
        { idUser: 20958, idRepository: 852233, url: "https://github.com/othomann/appscan_dynamic_analyzer" },
        { idUser: 20958, idRepository: 852237, url: "https://github.com/othomann/saucelabs" },
        { idUser: 20958, idRepository: 852295, url: "https://github.com/othomann/Java-TestNG-Selenium" },
        { idUser: 20958, idRepository: 852244, url: "https://github.com/othomann/es6-sample-project" },
        { idUser: 20958, idRepository: 852241, url: "https://github.com/othomann/sample-cloud-native-toolchain-tutorial-20180912182947083" },
        { idUser: 20958, idRepository: 852292, url: "https://github.com/othomann/sample-cloud-native-toolchain-tutorial-20190401213704460" },
        { idUser: 20958, idRepository: 852291, url: "https://github.com/othomann/sample-cloud-native-toolchain-tutorial-20190401212944890" },
        { idUser: 20958, idRepository: 852293, url: "https://github.com/othomann/sample-cloud-native-toolchain-tutorial-20190402172356568" },
        { idUser: 20958, idRepository: 852290, url: "https://github.com/othomann/sample-cloud-native-toolchain-tutorial-20190401134932638" },
        { idUser: 20958, idRepository: 852296, url: "https://github.com/othomann/sample-cloud-native-toolchain-tutorial-20190523155225861" },
        { idUser: 20958, idRepository: 852238, url: "https://github.com/open-toolchain/saucelabs" },
        { idUser: 20955, idRepository: 852149, url: "https://github.com/weinand/gh-static-e2e" },
        { idUser: 20959, idRepository: 852319, url: "https://github.com/dbaeumer/gh-static-e2e" },
        { idUser: 20958, idRepository: 852280, url: "https://github.com/othomann/python-http" },
        { idUser: 20958, idRepository: 852239, url: "https://github.com/othomann/gradle-build-scan-quickstart" },
        { idUser: 20958, idRepository: 852284, url: "https://github.com/othomann/ursa" },
        { idUser: 20958, idRepository: 852213, url: "https://github.com/othomann/starfighter-1464278950412" },
        { idUser: 20958, idRepository: 852212, url: "https://github.com/othomann/simon-starfighter" },
        { idUser: 20958, idRepository: 852243, url: "https://github.com/bkuschel/cloud-environments" },
        { idUser: 20958, idRepository: 852288, url: "https://github.com/open-toolchain/node-wd-sync" },
        { idUser: 20959, idRepository: 852309, url: "https://github.com/dbaeumer/tslint-microsoft-contrib" },
        { idUser: 20958, idRepository: 852215, url: "https://github.com/othomann/orion-plugins.github.io" },
        { idUser: 20955, idRepository: 852137, url: "https://github.com/microsoft/vscode-debugadapter-node" },
        { idUser: 20955, idRepository: 852143, url: "https://github.com/weinand/vscode-auto-attach" },
        { idUser: 20955, idRepository: 852135, url: "https://github.com/microsoft/vscode-mono-debug" },
        { idUser: 20958, idRepository: 852226, url: "https://github.com/othomann/grunt-sonar-runner" },
        { idUser: 20955, idRepository: 852133, url: "https://github.com/weinand/gulp-atom-shell" },
        { idUser: 20955, idRepository: 852151, url: "https://github.com/weinand/ExpressApp" },
        { idUser: 20958, idRepository: 852216, url: "https://github.com/othomann/java-language-server" },
        { idUser: 20955, idRepository: 852134, url: "https://github.com/microsoft/vscode-mock-debug" },
        { idUser: 20959, idRepository: 852306, url: "https://github.com/dbaeumer/edge" },
        { idUser: 20955, idRepository: 852145, url: "https://github.com/weinand/augmented-debug" },
        { idUser: 20958, idRepository: 852211, url: "https://github.com/othomann/acorn" },
        { idUser: 20959, idRepository: 852311, url: "https://github.com/DanTup/vscode-languageserver-node" },
        { idUser: 20959, idRepository: 852308, url: "https://github.com/johnpapa/hottowel-angular-typescript" },
        { idUser: 20955, idRepository: 852136, url: "https://github.com/microsoft/vscode-node-debug" },
        { idUser: 20955, idRepository: 852142, url: "https://github.com/weinand/vscode-processes" },
        { idUser: 20958, idRepository: 852221, url: "https://github.com/othomann/chess-application" },
        { idUser: 20955, idRepository: 852148, url: "https://github.com/weinand/ballpark-tracker" },
        { idUser: 20958, idRepository: 852224, url: "https://github.com/othomann/formulachess" },
        { idUser: 20959, idRepository: 852321, url: "https://github.com/dbaeumer/enzyme" },
        { idUser: 20959, idRepository: 852307, url: "https://github.com/jrieken/gulp-tsb" },
        { idUser: 20955, idRepository: 852141, url: "https://github.com/microsoft/vscode-recipes" },
        { idUser: 20958, idRepository: 852214, url: "https://github.com/othomann/eslint" },
        { idUser: 20958, idRepository: 852222, url: "https://github.com/othomann/jOpenChess" },
        { idUser: 20958, idRepository: 852208, url: "https://github.com/IBM-Cloud/gp-deliverypipeline" },
        { idUser: 20958, idRepository: 852246, url: "https://github.com/bkuschel/jx-docs" },
        { idUser: 20958, idRepository: 852249, url: "https://github.com/othomann/jx-docs" },
        { idUser: 20958, idRepository: 852250, url: "https://github.com/othomann/jx" },
        { idUser: 20958, idRepository: 852301, url: "https://github.com/othomann/pipeline" },
        { idUser: 20958, idRepository: 852234, url: "https://github.com/bogg/appscan_static_analyzer" },
        { idUser: 20958, idRepository: 852232, url: "https://github.com/othomann/appscan_static_analyzer" },
        { idUser: 20959, idRepository: 852323, url: "https://github.com/dbaeumer/TypeScript" }]

        for (let i = 0; i < respositories.length; i++) {
            try {
                const hasMetric = await this.sonarCtrl.sonarMetric.checkHasMetric(respositories[i].idUser, respositories[i].idRepository)
                if (hasMetric.length === 0) {
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
                }
            } catch (err) {
                console.log("getFeatures - master - " + err)
            }
        }
    }
}

module.exports = ApiSonaQualityGate;
