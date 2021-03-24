const Request = require("../util/request")
const Issue = require("../models/issue")
const _ = require("lodash")

class IssueCtrl {
    constructor(pool) {
        this.request = new Request()
        this.issue = new Issue(pool)
    }

    async getFeaturesOfIssues(userName) {
        try {
            const url = process.env.URL_GIT_API_GRAFQL;

            let stringQuery = this.issue.getStringIssues(userName);

            let issues = []

            let body = {
                query: stringQuery,
                variables: {},
            };

            const response = await this.request.post(url, body);

            if (typeof _.get(response, 'body.data.search.nodes') !== 'undefined') {
                const dataRepos = response.body.data.search.nodes.pop();
                if (!_.isEmpty(dataRepos) && !_.isEmpty(dataRepos.issues)) {
                    issues = dataRepos.issues.nodes;
                }
            } else {
                console.log(response);
                console.log(response.statusCode);
                console.log("SOME ERROR APPEARED");
            }

            return issues;
        } catch (err) {
            console.log(err);
        }
    }

    async saveIssues(issues, idUser) {
        let idIssue = null

        for (let i = 0; i < issues.length; i++) {

            const insertedIssue = await this.issue.insertIssue(issues[i], idUser)

            idIssue = insertedIssue.insertId

            for (let j = 0; j < issues[i].reactions.nodes.length; j++) {
                const issueReaction = issues[i].reactions.nodes[j]
                this.issue.insertIssueReaction(issueReaction, idIssue)
            }
        }
    }


}

module.exports = IssueCtrl;
