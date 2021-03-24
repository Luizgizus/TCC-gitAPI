const Request = require("../util/request")
const Repository = require("../models/repository")
const _ = require("lodash")

class RepositoryCtrl {
    constructor(pool) {
        this.repository = new Repository(pool)
    }

    async getRepositoryData() {
        return await this.repository.getRepositoryUrls()
    }
}

module.exports = RepositoryCtrl;