const Request = require("../util/request")
const Repository = require("../models/repository")
const _ = require("lodash")

class RepositoryCtrl {
    constructor(pool) {
        this.request = new Request()
        this.repository = new Repository(pool)
    }

    async getFeaturesOfRepositories(userName) {
        try {
            const url = process.env.URL_GIT_API_GRAFQL;

            let stringQuery = this.repository.getStringRepositories(userName);

            let respositories = [];

            let body = {
                query: stringQuery,
                variables: {},
            };

            const response = await this.request.post(url, body);

            if (typeof _.get(response, 'body.data.search.nodes') !== 'undefined') {
                const dataRepos = response.body.data.search.nodes.pop();
                if (!_.isEmpty(dataRepos) && !_.isEmpty(dataRepos.repositories)) {
                    respositories = dataRepos.repositories.nodes;
                }
            } else {
                console.log(response);
                console.log(response.statusCode);
                console.log("SOME ERROR APPEARED");
            }

            return respositories;
        } catch (err) {
            console.log(err);
        }
    }

    async saveRepositories(respositories, idUserInserted) {
        let idRepo = null

        for (let i = 0; i < respositories.length; i++) {

            let repoPrimaryLanguage = null
            if (
                !_.isEmpty(respositories[i].primaryLanguage) &&
                typeof _.get(respositories[i], 'primaryLanguage') !== 'undefined') {
                repoPrimaryLanguage = respositories[i].primaryLanguage.name
            }

            const insertedRepo = await this.repository.insertRepository(respositories[i], repoPrimaryLanguage, idUserInserted)

            idRepo = insertedRepo.insertId

            for (let j = 0; j < respositories[i].languages.nodes.length; j++) {

                const languageRepo = respositories[i].languages.nodes[j]
                this.repository.insertRepositoryLanguages(languageRepo, idRepo)
            }


            for (let j = 0; j < respositories[i].pullRequests.nodes.length; j++) {

                const pullRequestsRepo = respositories[i].pullRequests.nodes[j]
                this.repository.insertRepositoryPullRequests(pullRequestsRepo, idRepo)
            }
        }
    }

}

module.exports = RepositoryCtrl;
