const rp = require('request-promise')

class Request {
    constructor() {
        this.RPAP = rp.defaults({
            resolveWithFullResponse: true,
            gzip: true,
            encoding: 'binary',
        })
    }

    async post(url, body) {
        const options = {
            method: 'POST',
            uri: url,
            body: body,
            json: true
        }

        try {
            return await this.RPAP(options)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async get(url) {
        const options = {
            method: 'GET',
            uri: url
        }

        try {
            const response = await this.RPAP(options)
            try {
                response.body = JSON.parse(response.body)
                return response
            } catch (e) {
                return response
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

module.exports = Request