const rp = require('request-promise')

class Request {
    constructor() {
        this.RPAP = rp.defaults({
            resolveWithFullResponse: true,
            headers: {
                "Content-Type": "application/json",
                "Cookie": `XSRF-TOKEN=${process.env.COOKIE_XSRF_TOKEN_SONAR}; JWT-SESSION=${process.env.COOKIE_JWT_SESSION_SONAR}`
            }
        })
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

    async post(url, body, headers = false) {
        const options = {
            method: 'POST',
            uri: url,
            body: body,
            json: true
        }

        if (headers !== false) {
            options.headers = headers
        }

        try {
            return await this.RPAP(options)
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

module.exports = Request