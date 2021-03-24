const Request = require("../util/request")
const _ = require("lodash")
const Git = require("nodegit");
const Moment = require('moment')
const cmd = require('node-cmd');


class GitCtrl {
    constructor() {
        this.pathToRepos = `repositoriesOf-${Moment().format("DDMMYYYYHHmmss")}`
    }

    async cloneRepo(repository) {
        const response = {
            repoName: null,
            repoPath: null
        }
        try {
            response.repoName = repository.url.split("https://github.com/")[1].replace("/", "-")
            response.repoPath = `./${this.pathToRepos}/${response.repoName}`
            await Git.Clone(repository.url, response.repoPath)
        } catch (err) {
            console.log(err)
        } finally {
            return response;
        }
    }

    async deleteClonedRepo(repositoryPath) {
        try {
            const explodedRepositoryPath = repositoryPath.split("/")
            const rootFolder = explodedRepositoryPath[1]
            const repoFolder = explodedRepositoryPath[2]

            const logExecution = cmd.runSync(`cd ${rootFolder} && rd /q /s ${repoFolder}`)

            if (
                logExecution.err === null &&
                logExecution.stderr === null &&
                logExecution.data.length === 0) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = GitCtrl;