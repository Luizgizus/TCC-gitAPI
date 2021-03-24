const Request = require("../util/request")
const Contribuition = require("../models/contribuition")
const _ = require("lodash")

class ConstribuitionCtrl {
    constructor(pool) {
        this.request = new Request()
        this.contribuition = new Contribuition(pool)
    }

    async getFeaturesOfContribuition(userName) {
        try {
            const url = process.env.URL_GIT_API_GRAFQL;

            let stringQuery = this.contribuition.getStringContribuition(userName);

            let contribuitions = {}

            let body = {
                query: stringQuery,
                variables: {},
            };

            const response = await this.request.post(url, body);

            if (typeof _.get(response, 'body.data.search.nodes') !== 'undefined') {
                const dataRepos = response.body.data.search.nodes.pop();
                if (!_.isEmpty(dataRepos) && !_.isEmpty(dataRepos.contributionsCollection)) {
                    contribuitions = dataRepos.contributionsCollection;
                }
            } else {
                console.log(response);
                console.log(response.statusCode);
                console.log("SOME ERROR APPEARED");
            }

            return contribuitions;
        } catch (err) {
            console.log(err);
        }
    }

    async saveContribuition(contribuition, idUser) {
        return await this.contribuition.insertContribuition(contribuition, idUser)
    }


}

module.exports = ConstribuitionCtrl;