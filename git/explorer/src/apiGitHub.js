const _ = require("lodash");

const IssueCtrl = require("./controllers/issueCtrl");
const RepositoryCtrl = require("./controllers/repositoryCtrl");
const UserCtrl = require("./controllers/userCtrl");
const ContribuitionCtrl = require("./controllers/contribuitionsCtrl");

const MysqlService = require("../dataBase/MySQLService");


class ApiGitHub {
    constructor() {
        this.pool = MysqlService.getPool()
        this.issueCtrl = new IssueCtrl(this.pool)
        this.repositoryCtrl = new RepositoryCtrl(this.pool)
        this.userCtrl = new UserCtrl(this.pool)
        this.contribuitionCtrl = new ContribuitionCtrl(this.pool)
    }

    async getFeatures(userData) {
        const hasUser = await this.userCtrl.checkHasUser(userData.login);

        if (!hasUser) {
            const idUserInserted = await this.userCtrl.saveUser(userData);

            const respositories = await this.repositoryCtrl.getFeaturesOfRepositories(userData.login);
            await this.repositoryCtrl.saveRepositories(respositories, idUserInserted);

            const contribuition = await this.contribuitionCtrl.getFeaturesOfContribuition(userData.login);
            await this.contribuitionCtrl.saveContribuition(contribuition, idUserInserted);

            const issuesData = await this.issueCtrl.getFeaturesOfIssues(userData.login);
            await this.issueCtrl.saveIssues(issuesData, idUserInserted);
        }
    }
}

module.exports = ApiGitHub;
